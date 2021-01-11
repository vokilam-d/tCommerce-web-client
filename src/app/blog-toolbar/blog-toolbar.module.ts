import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogToolbarComponent } from './blog-toolbar.component';
import { RouterModule } from '@angular/router';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';


@NgModule({
  declarations: [BlogToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    LangRouterLinkModule
  ],
  exports: [BlogToolbarComponent]
})
export class BlogToolbarModule { }
