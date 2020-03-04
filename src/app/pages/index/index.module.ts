import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class IndexModule { }
