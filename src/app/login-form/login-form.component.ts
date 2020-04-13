import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '../shared/dtos/login.dto';
import { CustomerDto } from '../shared/dtos/customer.dto';
import { CustomerService } from '../shared/services/customer/customer.service';
import { normalizeEmailOrPhoneNumber } from '../shared/helpers/normalize-email-or-phone-number.function';
import { DEFAULT_ERROR_TEXT } from '../shared/constants';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  state: 'login' | 'reset' = 'login';
  isResetEmailSent: boolean = false;
  formError: string;
  isLoading: boolean = false;

  @Output() loggedIn = new EventEmitter<CustomerDto>();
  @Output('switchToRegister') switchToRegisterEmitter = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    const controls: Record<keyof LoginDto, any> = {
      login: ['', Validators.required],
      password: ['', Validators.required]
    };

    this.form = this.formBuilder.group(controls);
  }


  submit() {
    this.resetMessages();

    if (this.state === 'login') {
      if (this.form.invalid) {
        this.validateControls();
      } else {
        this.login();
      }
    } else if (this.state === 'reset') {
      if (this.form.get('login').invalid) {
        this.validateControls();
      } else {
        this.resetPassword();
      }
    }
  }

  private login() {
    const loginDto: LoginDto = this.form.value;
    loginDto.login = normalizeEmailOrPhoneNumber(loginDto.login);

    this.isLoading = true;
    this.customerService.login(loginDto)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.loggedIn.emit(response.data);
        },
        error => {
          this.formError = error.error && error.error.message || DEFAULT_ERROR_TEXT;
          console.warn(error.error || error);
        }
      );
  }

  private resetPassword() {
    let login = this.form.get('login').value;
    login = normalizeEmailOrPhoneNumber(login);

    this.isLoading = true;
    this.customerService.resetPassword({ login })
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        _ => {
          this.isResetEmailSent = true;
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

  switchToRegister() {
    this.switchToRegisterEmitter.emit();
  }

  toggleState() {
    this.state = this.state === 'login' ? 'reset' : 'login';
    this.resetMessages();
  }

  private resetMessages() {
    this.isResetEmailSent = false;
    this.formError = null;
  }
}
