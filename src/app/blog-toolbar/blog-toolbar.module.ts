import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogToolbarComponent } from './blog-toolbar.component';
import { RouterModule } from '@angular/router';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [BlogToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ],
  exports: [BlogToolbarComponent]
})
export class BlogToolbarModule { }
