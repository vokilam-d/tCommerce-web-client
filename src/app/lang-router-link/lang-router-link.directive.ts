import { Directive, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { LanguageService } from '../services/language/language.service';

@Directive({
  selector: 'a[langRouterLink]'
})
export class LangRouterLinkDirective extends RouterLinkWithHref {

  private readonly _router: Router;
  private readonly _route: ActivatedRoute;

  @Input()
  set langRouterLink(data: any[] | string | null | undefined) {
    this.onRouterLinkInput(data);
  }

  constructor(
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy,
    private languageService: LanguageService
  ) {
    super(router, route, locationStrategy);
    this._router = router;
    this._route = route;
  }

  private onRouterLinkInput(data: any[] | string | null | undefined) {
    let commands: any[] = [];
    if (data !== null && data !== undefined) {
      commands = Array.isArray(data) ? data : [data];
    }

    const tree = this._router.createUrlTree(commands, {
      relativeTo: this._route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: this.preserveFragment
    });

    let href = tree.toString();
    const commandsWithLang: any[] = [];

    if (href.startsWith('/')) {
      commandsWithLang.push('/');
      href = href.slice(1);
    }

    const routeLang = this.languageService.getCurrentRouteLang();
    if (routeLang) {
      commandsWithLang.push(routeLang);
    }

    if (href.length) {
      commandsWithLang.push(...href.split('/'));
    }

    this.routerLink = commandsWithLang;
    this.ngOnChanges({}); // This triggers updating "href" attribute
  }
}
