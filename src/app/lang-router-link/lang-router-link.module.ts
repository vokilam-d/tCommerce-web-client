import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangRouterLinkDirective } from './lang-router-link.directive';
import { LangRouterLinkActiveDirective } from './lang-router-link-active.directive';



@NgModule({
  declarations: [
    LangRouterLinkDirective,
    LangRouterLinkActiveDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LangRouterLinkDirective,
    LangRouterLinkActiveDirective
  ]
})
export class LangRouterLinkModule { }
