import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebClientIndexRoutingModule } from './index-routing.module';
import { WebClientIndexComponent } from './index.component';
import { WebClientHeaderModule } from '../../header/header.module';
import { WebClientFooterModule } from '../../footer/footer.module';

@NgModule({
  declarations: [WebClientIndexComponent],
  imports: [
    CommonModule,
    WebClientIndexRoutingModule,
    WebClientHeaderModule,
    WebClientFooterModule
  ]
})
export class WebClientIndexModule { }
