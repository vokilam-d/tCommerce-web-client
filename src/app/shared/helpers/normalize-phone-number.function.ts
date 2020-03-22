/**
 * Phone number must be in format '380123456789'
 * @param phoneNumber
 */
export function normalizePhoneNumber(phoneNumber: string): string {
  phoneNumber = phoneNumber.replace(/[\+\-_ ]/g, '');

  if (phoneNumber.indexOf('0') === 0) {
    phoneNumber = `38${phoneNumber}`;
  } else if (phoneNumber.indexOf('8') === 0) {
    phoneNumber = `3${phoneNumber}`;
  }

  return phoneNumber;
}
