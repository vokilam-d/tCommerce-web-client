import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogCategoryComponent } from './blog-category.component';

const routes: Routes = [{ path: '', component: BlogCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCategoryRoutingModule { }
