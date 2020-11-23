import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DEFAULT_ERROR_TEXT,
  DEFAULT_PHONE_NUMBER_VALUE,
  IS_EMAIL_REGEX,
  VALID_PASSWORD_REGEX
} from '../../../shared/constants';
import { CustomValidators } from '../../../shared/classes/validators';
import { CustomerService } from '../../../services/customer/customer.service';
import { CustomerDto, UpdateCustomerDto } from '../../../shared/dtos/customer.dto';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'account-customer-info',
  templateUrl: './account-customer-info.component.html',
  styleUrls: ['./account-customer-info.component.scss']
})
export class AccountCustomerInfoComponent implements OnInit {

  infoForm: FormGroup;
  passwordForm: FormGroup;
  formError: string;
  formSuccess: string | null = null;
  isLoading: boolean = false;

  get customer() { return this.customerService.customer; }

  constructor(private customerService: CustomerService,
              private headService: HeadService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  openInfoForm() {
    const infoControls: Partial<Record<keyof CustomerDto, any>> = {
      firstName: [this.customerService.customer.firstName],
      lastName: [this.customerService.customer.lastName],
      email: [this.customerService.customer.email, Validators.pattern(IS_EMAIL_REGEX)],
      phoneNumber: [this.customerService.customer.phoneNumber || DEFAULT_PHONE_NUMBER_VALUE, CustomValidators.phoneNumber]
    };

    this.infoForm = this.formBuilder.group(infoControls);
  }

  openPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      currentPassword: [''],
      newPassword: ['', Validators.pattern(VALID_PASSWORD_REGEX)],
      newPasswordConfirm: [''],
    });

    const confirmValidator = CustomValidators.passwordConfirm(this.passwordForm.get('newPassword'));
    this.passwordForm.get('newPasswordConfirm').setValidators(confirmValidator);
  }

  onInfoFormSubmit() {
    this.formError = null;
    this.formSuccess = null;

    if (this.infoForm.invalid) {
      this.validateControls(this.infoForm);
    } else {
      this.updateInfo();
    }
  }

  onPasswordFormSubmit() {
    this.formError = null;
    this.formSuccess = null;

    Object.keys(this.passwordForm.controls).forEach(controlName => {
      const control = this.passwordForm.get(controlName);
      control.updateValueAndValidity();
    });

    if (this.passwordForm.invalid) {
      this.validateControls(this.passwordForm);
    } else {
      this.updatePassword();
    }
  }

  private validateControls(form: FormGroup) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !control.valid && control.touched;
  }

  closeForms() {
    this.formError = null;
    this.infoForm = null;
    this.passwordForm = null;
  }

  private updateInfo() {
    const dto: UpdateCustomerDto = this.infoForm.value;
    this.customerService.updateCustomer(dto)
      .subscribe(
        _ => {
          this.showSuccessMessage('Ваши данные успешно изменены');
          this.closeForms();
        },
        error => {
          this.showErrorMessage(error);
        }
      );
  }

  private updatePassword() {
    const { newPasswordConfirm, ...dto } = this.passwordForm.value;

    this.customerService.updatePassword(dto)
      .subscribe(
        _ => {
          this.showSuccessMessage('Ваш пароль успешно изменён');
          this.closeForms();
        },
        error => {
          this.showErrorMessage(error);
        }
      );
  }

  private showSuccessMessage(msg: string) {
    this.formSuccess = msg;
    setTimeout(() => this.formSuccess = null, 5000);
  }

  private showErrorMessage(error: any) {
    this.formError = error.error?.message || DEFAULT_ERROR_TEXT;
    console.warn(error);
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Личный кабинет', description: 'Личный кабинет' });
  }
}
