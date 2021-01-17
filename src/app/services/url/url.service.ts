import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Language } from '../../shared/enums/language.enum';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private location: Location,
    private languageService: LanguageService
  ) { }

  getQueryParam(param: string): string | null {
    const [ pathname, search ] = this.location.path(false).split('?');

    const params = new URLSearchParams(search);
    return params.get(param);
  }

  setQueryParam(param: string, value: any) {
    const [ pathname, search ] = this.location.path(false).split('?');

    const params = new URLSearchParams(search);
    params.set(param, value);

    this.location.go(pathname, params.toString());
  }

  deleteQueryParam(param: string) {
    const [ pathname, search ] = this.location.path(false).split('?');

    const params = new URLSearchParams(search);
    params.delete(param);

    this.location.go(pathname, params.toString());
  }

  buildCurrentPathWithLang(lang: Language): string {
    let path = this.location.path(true);

    // remove current lang from path
    const currentRouteLang = this.languageService.getCurrentRouteLang();
    if (currentRouteLang) {
      const indexOfLangEnd = path.indexOf(currentRouteLang) + currentRouteLang.length;
      path = path.slice(indexOfLangEnd);
    }

    // prepend needed lang
    const routeLang = this.languageService.getRouteLangFromLang(lang);
    if (routeLang) {
      path = `/${routeLang}${path}`;
    }

    return path;
  }

  buildCurrentUrlWithLang(lang: Language): string {
    const path = this.buildCurrentPathWithLang(lang);
    return `https://klondike.com.ua${path}`;
  }
}
