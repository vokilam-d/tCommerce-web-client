import { Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { LanguageService } from '../../services/language/language.service';

@Directive({
  selector: '[langRouterLink]'
})
export class LangRouterLinkDirective extends RouterLinkWithHref implements OnInit {

  private readonly _router: Router;
  private readonly _route: ActivatedRoute;

  @Input() langRouterLink: any[] | string | null | undefined;

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

  ngOnInit() {
    let commands: any[] = [];
    if (this.langRouterLink !== null && this.langRouterLink !== undefined) {
      commands = Array.isArray(this.langRouterLink) ? this.langRouterLink : [this.langRouterLink];
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

    commandsWithLang.push(...href.split('/'));

    this.routerLink = commandsWithLang;
    this.href = this.urlTree.toString();
  }
}
