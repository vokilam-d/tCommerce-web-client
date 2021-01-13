import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPreviewComponent } from './products-preview.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ProductsPreviewComponent],
  imports: [
    CommonModule,
    ProductListItemModule,
    SharedModule,
    TranslateModule
  ],
  exports: [ProductsPreviewComponent]
})
export class ProductsPreviewModule { }
