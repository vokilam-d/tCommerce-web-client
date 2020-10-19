import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DEFAULT_PHONE_NUMBER_VALUE } from '../constants';

export class CustomValidators {
  static passwordConfirm(passwordControl: AbstractControl): ValidatorFn {
    return (passwordConfirmControl: AbstractControl): ValidationErrors | null => {
      if (passwordConfirmControl.value !== passwordControl.value) {
        return { mismatch: true };
      }

      return null;
    }
  }

  static phoneNumber(phoneControl: AbstractControl): ValidationErrors | null {
    const value: string = phoneControl.value;
    if (!value) {
      return { error: true };
    }

    const defaultValue = value.indexOf(DEFAULT_PHONE_NUMBER_VALUE) === 0
      || value.indexOf(DEFAULT_PHONE_NUMBER_VALUE.slice(1)) === 0;
    if (defaultValue && value.length !== 12) {
      return { error: true };
    }

    return null;
  }
}
