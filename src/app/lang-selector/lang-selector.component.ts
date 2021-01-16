import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../shared/enums/language.enum';
import { LanguageService } from '../services/language/language.service';
import { UrlService } from '../services/url/url.service';
import { NavigationEnd, Router } from '@angular/router';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent extends NgUnsubscribe implements OnInit {

  languages: { code: Language, link: string, label: string }[] = [];

  @Input() size: 'default' | 'big' = 'default';

  get activeLanguageCode(): Language {
    return this.languageService.getCurrentLang();
  }

  constructor(
    private languageService: LanguageService,
    private urlService: UrlService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.setLanguages();
    this.router.events
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setLanguages();
        }
      });
  }

  private setLanguages() {
    this.languages = [
      {
        code: Language.RU,
        link: this.urlService.buildCurrentPathWithLang(Language.RU),
        label: 'RU'
      },
      {
        code: Language.UK,
        link: this.urlService.buildCurrentPathWithLang(Language.UK),
        label: 'UA'
      }
    ];
  }
}
