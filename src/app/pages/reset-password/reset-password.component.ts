import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { DEFAULT_ERROR_TEXT, validPasswordRegex } from '../../shared/constants';
import { CustomValidators } from '../../shared/classes/validators';
import { finalize } from 'rxjs/operators';
import { ResetPasswordDto } from '../../shared/dtos/reset-password.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadService } from '../../services/head/head.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  formError: string;
  isLoading: boolean = false;
  success: boolean = false;
  private token: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private headService: HeadService,
              private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.setMeta();
    if (!this.checkToken()) {
      return;
    }

    this.buildForm();
  }

  private checkToken() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token === undefined) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  private buildForm() {
    const controls: Record<keyof Omit<ResetPasswordDto, 'token'>, any> = {
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
      this.validateControls();
    } else {
      this.resetPassword();
    }
  }

  private resetPassword() {
    const { password } = this.form.value;
    const resetDto: ResetPasswordDto = {
      password,
      token: this.token
    };

    this.isLoading = true;
    this.customerService.resetPassword(resetDto)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.success = true;
        },
        error => {
          this.formError = error.error && error.error.message || DEFAULT_ERROR_TEXT;
          console.warn(error.error || error);
        }
      );
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

  private setMeta() {
    this.headService.setMeta({ title: 'Восстановление пароля', description: 'Восстановление пароля' });
  }
}
