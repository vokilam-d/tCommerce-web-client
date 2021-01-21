import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  Optional,
  QueryList,
  Renderer2
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LangRouterLinkDirective } from './lang-router-link.directive';

@Directive({
  selector: 'a[langRouterLinkActive]'
})
export class LangRouterLinkActiveDirective extends RouterLinkActive {

  @Input()
  set langRouterLinkActive(data: string[] | string) {
    this.routerLinkActive = data;
  }

  @ContentChildren(LangRouterLinkDirective, { descendants: true })
  linksWithHrefs: QueryList<LangRouterLinkDirective>;

  constructor(
    router: Router,
    element: ElementRef,
    renderer: Renderer2,
    cdr: ChangeDetectorRef,
    @Optional() link?: RouterLink,
    @Optional() linkWithHref?: LangRouterLinkDirective
  ) {
    super(router, element, renderer, cdr, link, linkWithHref);
  }
}
