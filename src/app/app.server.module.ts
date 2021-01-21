import { Injectable, NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, XhrFactory } from '@angular/common/http';
import { UniversalInterceptor } from './shared/interceptors/universal.interceptor';
import * as xhr2 from 'xhr2';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DEFAULT_LANG } from './shared/constants';
import { languageLoaderServerFactory } from './services/language/language-loader.server';
import { TransferState } from '@angular/platform-browser';

// activate cookie for server-side rendering
@Injectable()
export class ServerXhr implements XhrFactory {
  build(): XMLHttpRequest {
    xhr2.prototype._restrictedHeaders.cookie = false;
    return new xhr2.XMLHttpRequest();
  }
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: languageLoaderServerFactory,
        deps: [TransferState]
      },
      defaultLanguage: DEFAULT_LANG
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    },
    {
      provide: XhrFactory,
      useClass: ServerXhr
    }
  ]
})
export class AppServerModule {}
