import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../shared/enums/language.enum';
import { Observable } from 'rxjs';
import { DEFAULT_LANG } from '../../shared/constants';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  constructor(private translateService: TranslateService) {
  }

  setCurrentLangByRouteLang(routeLang: string): Observable<any> {
    const lang = this.getLangFromRouteLang(routeLang);
    return this.setCurrentLang(lang);
  }

  setCurrentLang(lang: Language): Observable<any> {
    return this.translateService.use(lang);
  }

  getLangFromRouteLang(routeLang: string): Language {
    let lang: Language;

    switch (routeLang) {
      case 'ua':
        lang = Language.UK;
        break;
      case 'en':
        lang = Language.EN;
        break;
      default:
        lang = DEFAULT_LANG;
        break;
    }

    return lang;
  }

  getRouteLangFromLang(lang: Language): string {
    let routeLang: string = '';

    switch (lang) {
      case Language.UK:
        routeLang = 'ua'
        break;
      case Language.EN:
        routeLang = 'en'
        break;
      default:
        break;
    }

    return routeLang;
  }

  getCurrentRouteLang(): string {
    const currentLang = this.translateService.currentLang;
    return this.getRouteLangFromLang(currentLang as Language);
  }
}
