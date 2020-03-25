import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerDto, UpdateCustomerDto, UpdatePasswordDto } from '../../dtos/customer.dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../dtos/response.dto';
import { LoginDto } from '../../dtos/login.dto';
import { RegisterDto } from '../../dtos/registration.dto';
import { ResetPasswordDto } from '../../dtos/reset-password.dto';
import { AccountDto} from '../../dtos/account.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customer: CustomerDto;
  private showLoginModalSource$ = new Subject();
  showLoginModal$ = this.showLoginModalSource$.asObservable();
  account: AccountDto;

  get isLoggedIn(): boolean { return !!this.customer; }
  get customerName(): string { return this.customer ? `${this.customer.firstName} ${this.customer.lastName}` : ''; }
  get customerEmail(): string { return this.customer ? this.customer.email : ''; }

  constructor(private router: Router,
              private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer`)
      .subscribe(
        response => {
          this.customer = response.data;
        }
      );
  }

  setCustomer(customer: CustomerDto) {
    this.customer = customer;
  }

  fetchAccount() {
    return this.http.get<ResponseDto<AccountDto>>(`http://localhost:3500/api/v1/customer/account`);
  }

  showLoginModal() {
    this.showLoginModalSource$.next();
  }

  login(loginDto: LoginDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer/login`, loginDto);
  }

  resetPassword(resetDto: ResetPasswordDto) {
    return this.http.post<any>(`http://localhost:3500/api/v1/customer/reset`, resetDto);
  }

  register(registerDto: RegisterDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer/register`, registerDto);
  }

  logout(): void {
    this.http.post(`http://localhost:3500/api/v1/customer/logout`, { }).subscribe(
      _ => {
        this.customer = null;
      }
    );
  }

  sendEmailConfirm() {
    return this.http.post<ResponseDto<boolean>>(`http://localhost:3500/api/v1/customer/send-confirm-email`, { });
  }

  updateCustomer(dto: UpdateCustomerDto) {
    return this.http.patch<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer`, dto);
  }

  updatePassword(dto: UpdatePasswordDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer/password`, dto);
  }
}
