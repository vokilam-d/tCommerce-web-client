import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilterComponent } from './filter/filter.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../pagination/pagination.module';


@NgModule({
  declarations: [
    ProductListComponent,
    SortingComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ProductListItemModule,
    PaginationModule,
    ReactiveFormsModule
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
