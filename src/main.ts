import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {

  Sentry.init({
    dsn: "https://b26c200a5ce44bd3a310d8e4743c9e2a@o499816.ingest.sentry.io/5578766",
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ["localhost", "https://klondike.com.ua"],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 1.0,
  });

  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
