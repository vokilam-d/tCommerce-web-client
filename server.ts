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
import { logDebug } from './src/app/shared/helpers/debug.function';

let isPagesUpdateStarted: boolean = false;
let pages: PageRegistryDto[] = [];
const thirtySeconds = 30 * 1000;

async function updatePages(apiHost: string) {
  if (apiHost.indexOf('http') !== 0) {
    apiHost = 'http://' + apiHost;
  }

  try {
    const { data: response } = await axios.get<ResponseDto<PageRegistryDto[]>>(`${apiHost}/api/v1/pages`);
    if (response.data) {
      pages = response.data;
      // console.log(`${new Date().toISOString()} - Updated pages, count - ${pages.length}`);
    } else {
      console.error(`${new Date().toISOString()} - No pages in response:`);
      console.error(response);
    }
  } catch (ex) {
    console.error(`${new Date().toISOString()} - Could not update pages:`);
    console.error(ex.response ? ex.response.data : ex.toString());
  }

  setTimeout(() => updatePages(apiHost), thirtySeconds);
}

async function handleUpdatePages(req: express.Request) {
  if (isPagesUpdateStarted) { return; }

  const apiHost = environment.production ? req.get('host') : API_HOST;
  await updatePages(apiHost);
  isPagesUpdateStarted = true;
}

function handleResponse(req: express.Request, res: express.Response) {
  logDebug(`[handleResponse] "${req.url}" Start`);
  const targetUrl = decodeURIComponent(req.url.slice(1)); // slice preceding slash "/"
  const foundPage = pages.find(page => page.slug === targetUrl);

  if (foundPage?.redirectSlug) {
    res.redirect(301, foundPage.redirectSlug);

  } else {
    logDebug(`[handleResponse] "${req.url}" Before render`);
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
      },
      (err, html) => {
        logDebug(`[handleResponse] "${req.url}" Render callback`);
        res.status(200).send(html);
      }
    );
  }
}

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get(`/robots.txt`, (req, res) => res.sendFile(join(distFolder, 'assets', 'robots.txt')));

  server.get(`/api/*`, (req, res) => {
    console.log(`${new Date().toISOString()} - Got api request: ${req.url}`)
    res.send(`API is not supported`);
  });

  server.get('*', async (req: express.Request, res: express.Response) => {
    logDebug(`Init req "${req.url}"`);
    await handleUpdatePages(req);
    logDebug(`[handleResponse] "${req.url}" Before`);
    handleResponse(req, res);
  });

  return server;
}

function run() {
  const port = +process.env.PORT || 3002;

  const server = app();
  server.listen(port, '0.0.0.0', () => {
    // setInterval(() => Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`)), 20000);
    console.log(`Node Express server listening on http://localhost:${port}`);

    // const log = () => {
    //   Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`));
    //   setTimeout(() => log(), 60 * 60 * 1000);
    // }
    // log();
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
