import { Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../enums/language.enum';

@Directive({
  selector: '[langRouterLink]'
})
export class LangRouterLinkDirective extends RouterLinkWithHref implements OnInit {

  @Input() langRouterLink: any[] | string | null | undefined;

  constructor(
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy,
    private translateService: TranslateService
  ) {
    super(router, route, locationStrategy);
  }

  ngOnInit() {
    const commands: any[] = [];

    if (this.langRouterLink === null || this.langRouterLink === undefined) {
      this.initByCommands(commands);
      return;
    }

    const handlePrecedingSlash = (segment: any): any => {
      if (typeof segment === 'string' && segment.startsWith('/')) {
        segment = segment.slice(1);
        commands.push('/');
      }

      return segment;
    }

    const isArray: boolean = Array.isArray(this.langRouterLink);

    // First must go slash, if it exists
    if (isArray) {
      (this.langRouterLink[0] as any[]) = handlePrecedingSlash(this.langRouterLink[0]);
    } else {
      this.langRouterLink = handlePrecedingSlash(this.langRouterLink);
    }

    // Second is language
    const currentLang = this.translateService.currentLang;
    switch (currentLang) {
      case Language.UK:
        commands.push('ua');
        break;
      case Language.EN:
        commands.push('en');
        break;
      default:
        break;
    }

    // Third - rest of the route
    if (isArray) {
      commands.push(...this.langRouterLink);
    } else {
      commands.push(this.langRouterLink);
    }

    this.initByCommands(commands);
  }

  private initByCommands(commands: any[]): void {
    this.routerLink = commands;
    this.href = this.urlTree.toString();
  }
}
