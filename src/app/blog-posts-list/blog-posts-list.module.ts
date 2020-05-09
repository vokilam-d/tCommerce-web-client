import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostsListComponent } from './blog-posts-list.component';



@NgModule({
  declarations: [BlogPostsListComponent],
  imports: [
    CommonModule
  ],
  exports: [BlogPostsListComponent]
})
export class BlogPostsListModule { }
