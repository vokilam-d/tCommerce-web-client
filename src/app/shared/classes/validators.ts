import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordConfirm(passwordControl: AbstractControl): ValidatorFn {
    return (passwordConfirmControl: AbstractControl): ValidationErrors | null => {
      if (passwordConfirmControl.value !== passwordControl.value) {
        return { mismatch: true };
      }

      return null;
    }
  }
}
