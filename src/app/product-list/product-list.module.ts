import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilterComponent } from './filter/filter.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../pagination/pagination.module';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    SortingComponent,
    FilterComponent,
    RangeSliderComponent
  ],
  imports: [
    CommonModule,
    ProductListItemModule,
    PaginationModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
