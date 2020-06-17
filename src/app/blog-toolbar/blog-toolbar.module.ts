import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogToolbarComponent } from './blog-toolbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [BlogToolbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BlogToolbarComponent]
})
export class BlogToolbarModule { }
