import { IS_EMAIL_REGEX } from '../constants';
import { normalizePhoneNumber } from './normalize-phone-number.function';

export function normalizeEmailOrPhoneNumber(emailOrPhone: string): string {
  if (emailOrPhone.match(IS_EMAIL_REGEX)) {
    return emailOrPhone.trim();
  } else {
    return normalizePhoneNumber(emailOrPhone);
  }
}
