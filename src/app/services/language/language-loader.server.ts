import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TransferState } from '@angular/platform-browser';
import { Language } from '../../shared/enums/language.enum';
import { makeLangStateKey } from '../../shared/helpers/make-lang-state-key.function';
import { encodeTranslation } from './translation-encode.function';

export class LanguageLoaderServer implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  public getTranslation(lang: Language): Observable<any> {
    const translation = require(`../../../assets/translations/${lang}.json`);

    const encodedTranslation = encodeTranslation(translation);
    this.transferState.set(makeLangStateKey(lang), encodedTranslation);

    return of(translation);
  }
}

export function languageLoaderServerFactory(transferState: TransferState) {
  return new LanguageLoaderServer(transferState);
}
