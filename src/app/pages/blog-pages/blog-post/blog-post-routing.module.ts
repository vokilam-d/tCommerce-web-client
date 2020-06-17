import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogPostComponent } from './blog-post.component';

const routes: Routes = [{ path: '', component: BlogPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPostRoutingModule { }
