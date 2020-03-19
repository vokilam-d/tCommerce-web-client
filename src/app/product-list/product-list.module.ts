import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilterComponent } from './filter/filter.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { PaginationComponent } from './pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductListComponent, SortingComponent, FilterComponent, PaginationComponent],
  imports: [
    CommonModule,
    ProductListItemModule,
    ReactiveFormsModule
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
