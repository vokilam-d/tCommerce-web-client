import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TransferState } from '@angular/platform-browser';
import { Language } from '../../shared/enums/language.enum';
import { makeLangStateKey } from '../../shared/helpers/make-lang-state-key.function';

export class LanguageLoaderServer implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  public getTranslation(lang: Language): Observable<any> {
    const data = require(`../../../assets/translations/${lang}.json`);

    this.transferState.set(makeLangStateKey(lang), data);

    return of(data);
  }
}

export function languageLoaderServerFactory(transferState: TransferState) {
  return new LanguageLoaderServer(transferState);
}
