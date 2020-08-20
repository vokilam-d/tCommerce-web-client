import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { PAGES_TOKEN } from './src/app/shared/factories/routes-resolver.function';
import { PageRegistryDto } from './src/app/shared/dtos/page-registry.dto';
import axios from 'axios';
import { ResponseDto } from './src/app/shared/dtos/response.dto';
import { environment } from './src/environments/environment';
import { API_HOST } from './src/app/shared/constants';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

let pages: PageRegistryDto[] = [];

const thirtySeconds = 30 * 1000;
async function updatePages(apiHost: string) {
  if (apiHost.indexOf('http') !== 0) {
    apiHost = 'http://' + apiHost;
  }

  try {
    const { data: response } = await axios.get<ResponseDto<PageRegistryDto[]>>(`${apiHost}/api/v1/pages`);
    pages = response.data;
    console.log(`${new Date().toISOString()} - [updatePages]: fetched ${pages.length} pages`);
  } catch (ex) {
    console.error(`${new Date().toISOString()} - Could not update pages:`);
    console.error(ex.response ? ex.response.data : ex.toString());
  }

  setTimeout(() => updatePages(apiHost), thirtySeconds);
}

let isPagesUpdateStarted: boolean = false;
async function handleUpdatePages(req: express.Request) {
  if (isPagesUpdateStarted) { return;}

  const apiHost = environment.production ? req.get('host') : API_HOST;
  await updatePages(apiHost);
  isPagesUpdateStarted = true;
}

function handleResponse(req: express.Request, res: express.Response) {
  const targetUrl = req.url.slice(1); // slice "/" preceding sign
  const foundPage = pages.find(page => page.slug === targetUrl);

  if (foundPage?.redirectSlug) {
    res.redirect(301, foundPage.redirectSlug);

  } else {
    res.render(
      'index',
      {
        req,
        providers: [
          {
            provide: APP_BASE_HREF,
            useValue: req.baseUrl
          },
          {
            provide: RESPONSE,
            useValue: res
          },
          {
            provide: PAGES_TOKEN,
            useValue: pages
          }
        ]
      }
    );
  }
}

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get(`/robots.txt`, (req, res) => res.sendFile(join(distFolder, 'assets', 'robots.txt')));

  server.get(`/api/*`, (req, res) => {
    console.log(`${new Date().toISOString()} - Got api request: ${req.url}`)
    res.send(`API is not supported`);
  });

  // All regular routes use the Universal engine

  server.get('*', async (req: express.Request, res: express.Response) => {
    await handleUpdatePages(req);
    handleResponse(req, res);
  });

  return server;
}

function run() {
  const port = +process.env.PORT || 3002;

  // Start up the Node server
  const server = app();
  server.listen(port, '0.0.0.0', () => {
    setInterval(() => Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`)), 20000);
    console.log(`Node Express server listening on http://localhost:${port}`);

    const log = () => {
      Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`));
      setTimeout(() => log(), 60 * 60 * 1000);
    }
    log();
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './src/main.server';

export { renderModule, renderModuleFactory } from '@angular/platform-server';
