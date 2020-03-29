import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerDto, UpdateCustomerDto, UpdatePasswordDto } from '../../dtos/customer.dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../dtos/response.dto';
import { LoginDto } from '../../dtos/login.dto';
import { RegisterDto } from '../../dtos/registration.dto';
import { ResetPasswordDto } from '../../dtos/reset-password.dto';
import { DetailedCustomerDto } from '../../dtos/detailed-customer.dto';
import { ShippingAddressDto } from '../../dtos/shipping-address.dto';
import { map, tap } from 'rxjs/operators';
import { CreateOrUpdateOrderItemDto, OrderItemDto } from '../../dtos/order-item.dto';
import { ProductDto } from '../../dtos/product.dto';
import { ProductListItemDto } from '../../dtos/product-list-item.dto';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customer: CustomerDto | DetailedCustomerDto;
  private _cart: OrderItemDto[];
  private _showLoginModal$ = new Subject();
  private _showCartModal$ = new Subject<string>();
  showLoginModal$ = this._showLoginModal$.asObservable();
  showCartModal$ = this._showCartModal$.asObservable();
  cartInit$ = new BehaviorSubject(false);


  get customer() { return this._customer; }
  get cart() { return this._cart; }
  get cartTotalCost() { return this._cart && this._cart.reduce((acc, item) => acc + item.totalCost, 0); }
  get isLoggedIn(): boolean { return !!this.customer; }
  get customerName(): string { return this.customer ? `${this.customer.firstName} ${this.customer.lastName}` : ''; }
  get customerEmail(): string { return this.customer ? this.customer.email : ''; }

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any,
              private http: HttpClient) {
    this.init();
  }

  private init() {
    this.http.get<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer`)
      .subscribe(
        response => {
          if (!this.customer) { // guard if 'fetchCustomerDetails' got response faster
            this.setCustomer(response.data);
          }
        }
      );
  }

  setCustomer(customer: CustomerDto | DetailedCustomerDto) {
    this._customer = customer;

    this.initCart();
  }

  fetchCustomerDetails() {
    return this.http.get<ResponseDto<DetailedCustomerDto>>(`http://localhost:3500/api/v1/customer/details`);
  }

  showLoginModal() {
    this._showLoginModal$.next();
  }

  showCartModal() {
    this._showCartModal$.next();
  }

  login(loginDto: LoginDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer/login`, loginDto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  resetPassword(resetDto: ResetPasswordDto) {
    return this.http.post<any>(`http://localhost:3500/api/v1/customer/reset`, resetDto);
  }

  register(registerDto: RegisterDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer/register`, registerDto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  logout(): void {
    this.http.post(`http://localhost:3500/api/v1/customer/logout`, { }).subscribe(
      _ => {
        this.setCustomer(null);
      }
    );
  }

  sendEmailConfirm() {
    return this.http.post<ResponseDto<boolean>>(`http://localhost:3500/api/v1/customer/send-confirm-email`, { });
  }

  updateCustomer(dto: UpdateCustomerDto) {
    return this.http.patch<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer`, dto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  updatePassword(dto: UpdatePasswordDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`http://localhost:3500/api/v1/customer/password`, dto);
  }

  addShippingAddress(dto: ShippingAddressDto) {
    return this.http.post<ResponseDto<DetailedCustomerDto>>(`http://localhost:3500/api/v1/customer/address`, dto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  editShippingAddress(addressId: string, dto: ShippingAddressDto) {
    return this.http.put<ResponseDto<DetailedCustomerDto>>(`http://localhost:3500/api/v1/customer/address/${addressId}`, dto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  private initCart() {
    if (this.cartInit$.getValue() || !isPlatformBrowser(this.platformId)) { return; }

    const savedCart = this.customer ? this.customer.cart : JSON.parse(localStorage.getItem('cart'));
    this._cart = savedCart || [];
    this.cartInit$.next(true);
  }

  addToCart(product: ProductDto | ProductListItemDto, qty: number) {
    const alreadyAdded = this.cart.find(item => item.sku === product.sku);
    if (alreadyAdded) { qty += alreadyAdded.qty; }

    const dto: CreateOrUpdateOrderItemDto = { sku: product.sku, qty };
    return this.http.put<ResponseDto<OrderItemDto>>(`http://localhost:3500/api/v1/cart`, dto)
      .pipe(
        tap(response => {
          this.saveToCart(response.data);
          this._showCartModal$.next();
        })
      );
  }

  updateQtyInCart(orderItemDto: OrderItemDto, qty: number) {
    const dto: CreateOrUpdateOrderItemDto = { sku: orderItemDto.sku, qty };

    return this.http.put<ResponseDto<OrderItemDto>>(`http://localhost:3500/api/v1/cart`, dto)
      .pipe(
        tap(response => {
          this.saveToCart(response.data);
        })
      );
  }

  deleteFromCart(cartItemToDelete: OrderItemDto) {
    const foundIdx = this._cart.findIndex(cartItem => cartItem.sku === cartItemToDelete.sku);
    if (foundIdx === -1) {
      return;
    }

    this._cart.splice(foundIdx, 1);
    this.saveCartToStorage();

    if (this.isLoggedIn) {
      this.http.delete<ResponseDto<boolean>>(`http://localhost:3500/api/v1/cart/${cartItemToDelete.sku}`)
        .subscribe();
    }
  }

  private saveToCart(item: OrderItemDto) {
    const alreadyAddedIdx = this._cart.findIndex(cartItem => cartItem.sku === item.sku);
    if (alreadyAddedIdx === -1) {
      this._cart.push(item);
    } else {
      this._cart[alreadyAddedIdx] = {
        ...this._cart[alreadyAddedIdx],
        ...item
      };
    }

    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    if (this.customer) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  resetCart() {
    this._cart = null;
    localStorage.removeItem('cart');
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const encoded = encodeURIComponent(email);

    return this.http.get<ResponseDto<boolean>>(`http://localhost:3500/api/v1/customer/is-email-available/${encoded}`)
      .pipe( map(response => response.data) );
  }
}
