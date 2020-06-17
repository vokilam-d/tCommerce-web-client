import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostsListComponent } from './blog-posts-list.component';
import { RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BlogPostsListComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule,
    SharedModule
  ],
  exports: [BlogPostsListComponent]
})
export class BlogPostsListModule { }
