import { FormArray, FormControl, FormGroup } from '@angular/forms';

export const markControlsAsTouched = (form: FormGroup | FormArray): void => {
  Object.keys(form.controls).forEach(controlName => {
    const control = form.get(controlName);

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      markControlsAsTouched(control);
    }
  });
};
