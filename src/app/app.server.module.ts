import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { WebClientAppModule } from './app.module';
import { WebClientAppComponent } from './app.component';

@NgModule({
  imports: [
    WebClientAppModule,
    ServerModule
],
  bootstrap: [WebClientAppComponent],
})
export class AppServerModule {}
