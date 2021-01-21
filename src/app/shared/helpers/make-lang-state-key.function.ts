import { Language } from '../enums/language.enum';
import { makeStateKey, StateKey } from '@angular/platform-browser';

export const makeLangStateKey = (lang: Language): StateKey<any> => {
  return makeStateKey<any>(`transfer-translate-${lang}`);
}
