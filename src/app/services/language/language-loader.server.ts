import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TransferState } from '@angular/platform-browser';
import { Language } from '../../shared/enums/language.enum';
import { makeLangStateKey } from '../../shared/helpers/make-lang-state-key.function';

const translationsCache = { };

export class LanguageLoaderServer implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  public getTranslation(lang: Language): Observable<any> {
    let translation: any;

    if (translationsCache[lang]) {
      translation = translationsCache[lang];
    } else {
      translation = require(`../../../assets/translations/${lang}.json`);
      translationsCache[lang] = translation;
    }

    this.transferState.set(makeLangStateKey(lang), translation);

    return of(translation);
  }
}

export function languageLoaderServerFactory(transferState: TransferState) {
  return new LanguageLoaderServer(transferState);
}
