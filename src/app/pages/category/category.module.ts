import { NgModule } from '@angular/core';

import { WebClientCategoryRoutingModule } from './category-routing.module';
import { WebClientCategoryComponent } from './category.component';
import { WebClientHeaderModule } from '../../header/header.module';
import { WebClientFooterModule } from '../../footer/footer.module';
import { CommonModule } from '@angular/common';
import { WebClientBreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { WebClientFilterModule } from '../../filter/filter.module';
import { WebClientSortingModule } from '../../sorting/sorting.module';
import { WebClientCategoryItemModule } from '../../category-item/category-item.module';

@NgModule({
  declarations: [WebClientCategoryComponent],
  imports: [
    WebClientCategoryRoutingModule,
    WebClientHeaderModule,
    WebClientFooterModule,
    CommonModule,
    WebClientBreadcrumbsModule,
    WebClientFilterModule,
    WebClientSortingModule,
    WebClientCategoryItemModule
  ]
})
export class WebClientCategoryModule { }
