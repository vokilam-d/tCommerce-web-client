import { isEmailRegex } from '../constants';
import { normalizePhoneNumber } from './normalize-phone-number.function';

export function normalizeEmailOrPhoneNumber(emailOrPhone: string): string {
  if (emailOrPhone.match(isEmailRegex)) {
    return emailOrPhone.trim();
  } else {
    return normalizePhoneNumber(emailOrPhone);
  }
}
