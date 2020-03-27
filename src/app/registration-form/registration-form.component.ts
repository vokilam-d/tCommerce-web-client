import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerDto } from '../shared/dtos/customer.dto';
import { CustomerService } from '../shared/services/customer/customer.service';
import { RegisterDto } from '../shared/dtos/registration.dto';
import { CustomValidators } from '../shared/classes/validators';
import { DEFAULT_ERROR_TEXT, isEmailRegex, validPasswordRegex } from '../shared/constants';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  form: FormGroup;
  formError: string;
  isLoading: boolean = false;

  @Output() registered = new EventEmitter<CustomerDto>();
  @Output('switchToLogin') switchToLoginEmitter = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    const controls: Record<keyof RegisterDto, any> = {
      firstName: [''],
      lastName: [''],
      email: ['', Validators.pattern(isEmailRegex)],
      password: ['', Validators.pattern(validPasswordRegex)]
    };
    (controls as any).passwordConfirm = [''];

    this.form = this.formBuilder.group(controls);
    this.form.get('passwordConfirm').setValidators(CustomValidators.passwordConfirm(this.form.get('password')));
  }

  submit() {
    this.formError = null;

    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      control.updateValueAndValidity();
    });

    if (this.form.invalid) {
      this.validateControls()
    } else {
      this.register();
    }
  }

  private register() {
    const { passwordConfirm, ...registerDto } = this.form.value;

    this.isLoading = true;
    this.customerService.register(registerDto)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.registered.emit(response.data);
        },
        error => {
          this.formError = error.error && error.error.message || DEFAULT_ERROR_TEXT;
          console.warn(error.error || error);
        }
      )
  }

  private validateControls() {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !control.valid && control.touched;
  }

  switchToLogin() {
    this.formError = null;
    this.switchToLoginEmitter.emit();
  }
}
