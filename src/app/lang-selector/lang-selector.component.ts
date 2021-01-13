import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../shared/enums/language.enum';
import { LanguageService } from '../services/language/language.service';
import { UrlService } from '../services/url/url.service';

@Component({
  selector: 'lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {

  languages: { code: Language, link: string, label: string }[] = [];

  @Input() size: 'default' | 'big' = 'default';

  get activeLanguageCode(): Language {
    return this.languageService.getCurrentLang();
  }

  constructor(
    private languageService: LanguageService,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.setLanguages();
  }

  private setLanguages() {
    this.languages = [
      {
        code: Language.RU,
        link: this.urlService.buildPathForLang(Language.RU),
        label: 'RU'
      },
      {
        code: Language.UK,
        link: this.urlService.buildPathForLang(Language.UK),
        label: 'UA'
      }
    ];
  }
}
