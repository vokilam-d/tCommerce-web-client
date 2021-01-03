import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerDto, UpdateCustomerDto, UpdatePasswordDto } from '../../shared/dtos/customer.dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { LoginDto } from '../../shared/dtos/login.dto';
import { RegisterDto } from '../../shared/dtos/registration.dto';
import { InitResetPasswordDto } from '../../shared/dtos/init-reset-password.dto';
import { ShipmentAddressDto } from '../../shared/dtos/shipment-address.dto';
import { map, tap } from 'rxjs/operators';
import { CreateOrUpdateOrderItemDto, OrderItemDto } from '../../shared/dtos/order-item.dto';
import { API_HOST } from '../../shared/constants';
import { ResetPasswordDto } from '../../shared/dtos/reset-password.dto';
import { OrderDto } from '../../shared/dtos/order.dto';
import { OrderPricesDto } from '../../shared/dtos/order-prices.dto';
import { CalculatePricesDto } from '../../shared/dtos/calculate-prices.dto';
import { vibrate } from '../../shared/helpers/vibrate.function';
import { DeviceService } from '../device-detector/device.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService { // todo split to CartService

  private _customer = new BehaviorSubject<CustomerDto | null>(null);
  private _cart: OrderItemDto[] = [];
  private _showLoginModal$ = new Subject();
  private _showCartModal$ = new Subject<boolean>();
  customer$ = this._customer.asObservable();
  showLoginModal$ = this._showLoginModal$.asObservable();
  showCartModal$ = this._showCartModal$.asObservable();
  cartInit$ = new BehaviorSubject(false);
  prices: OrderPricesDto = new OrderPricesDto();

  get customer() { return this._customer.getValue(); }
  get cart() { return this._cart; }
  get isLoggedIn(): boolean { return !!this.customer; }
  get customerName(): string { return this.customer ? `${this.customer.firstName} ${this.customer.lastName}` : ''; }
  get customerEmail(): string { return this.customer ? this.customer.email : ''; }

  constructor(
    private router: Router,
    private http: HttpClient,
    private deviceService: DeviceService
  ) {

    this.fetchCustomer().subscribe({
      error(err) { console.log(`${new Date().toISOString()} - Could not fetch customer`, err.message); }
    });
  }

  fetchCustomer(): Observable<ResponseDto<CustomerDto>> {
    if (!this.deviceService.isPlatformBrowser()) {
      return EMPTY;
    }

    return this.http.get<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer`)
      .pipe(
        tap(
          response => {
            if (!this.customer) { // guard for if 'fetchCustomerDetails' got response faster
              this.setCustomer(response.data);
            }
          }
        )
      );
  }

  setCustomer(customer: CustomerDto) {
    this._customer.next(customer);

    this.initCart();
  }

  fetchCustomerDetails() {
    return this.http.get<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer/details`);
  }

  showLoginModal() {
    this._showLoginModal$.next();
  }

  showCartModal() {
    this._showCartModal$.next();
  }

  login(loginDto: LoginDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer/login`, loginDto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  getSocialLoginUrl(provider: 'google' | 'facebook') {
    return `${API_HOST}/api/v1/customer/login/${provider}`;
  }

  initResetPassword(initResetDto: InitResetPasswordDto) {
    return this.http.post<any>(`${API_HOST}/api/v1/customer/init-reset-password`, initResetDto);
  }

  resetPassword(resetDto: ResetPasswordDto) {
    return this.http.post<any>(`${API_HOST}/api/v1/customer/reset-password`, resetDto);
  }

  register(registerDto: RegisterDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer/register`, registerDto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  logout(): void {
    this.http.post(`${API_HOST}/api/v1/customer/logout`, { })
      .subscribe(_ => this.setCustomer(null));
  }

  sendEmailConfirm() {
    return this.http.post<ResponseDto<boolean>>(`${API_HOST}/api/v1/customer/send-confirm-email`, { });
  }

  confirmEmail(token: string) {
    return this.http.post<ResponseDto<boolean>>(`${API_HOST}/api/v1/customer/confirm-email`, { token });
  }

  updateCustomer(dto: UpdateCustomerDto) {
    return this.http.patch<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer`, dto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  updatePassword(dto: UpdatePasswordDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer/password`, dto);
  }

  addShippingAddress(dto: ShipmentAddressDto) {
    return this.http.post<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer/address`, dto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  editShippingAddress(addressId: string, dto: ShipmentAddressDto) {
    return this.http.put<ResponseDto<CustomerDto>>(`${API_HOST}/api/v1/customer/address/${addressId}`, dto)
      .pipe(
        tap(response => this.setCustomer(response.data))
      );
  }

  private initCart() {
    if (this.cartInit$.getValue() || !this.deviceService.isPlatformBrowser()) { return; }

    const savedCart = this.customer ? this.customer.cart : JSON.parse(localStorage.getItem('cart'));
    this._cart = savedCart || [];
    this.cartInit$.next(true);
    this.updatePrices();
  }

  addToCart(sku: string, qty: number, additionalServiceIds: number[] = []) {
    const alreadyAdded = this.cart.find(item => item.sku === sku);
    if (alreadyAdded) { qty += alreadyAdded.qty; }

    const dto: CreateOrUpdateOrderItemDto = { sku, qty, additionalServiceIds };
    return this.http.put<ResponseDto<OrderItemDto>>(`${API_HOST}/api/v1/cart`, dto)
      .pipe(
        tap(response => {
          this.saveToCart(response.data);
          vibrate();
          this._showCartModal$.next(true);
          this.updatePrices();
        })
      );
  }

  updateQtyInCart(orderItemDto: OrderItemDto, qty: number) {
    const additionalServiceIds: number[] = orderItemDto.additionalServices.map(service => service.id);
    const dto: CreateOrUpdateOrderItemDto = { sku: orderItemDto.sku, qty, additionalServiceIds };

    return this.http.put<ResponseDto<OrderItemDto>>(`${API_HOST}/api/v1/cart`, dto)
      .pipe(
        tap(response => {
          this.saveToCart(response.data);
          this.updatePrices();
        })
      );
  }

  deleteFromCart(cartItemToDelete: OrderItemDto) {
    const foundIdx = this._cart.findIndex(cartItem => cartItem.sku === cartItemToDelete.sku);
    if (foundIdx === -1) {
      return;
    }

    this._cart.splice(foundIdx, 1);
    vibrate();
    this.saveCartToStorage();
    this.updatePrices();

    if (this.isLoggedIn) {
      this.http.delete<ResponseDto<boolean>>(`${API_HOST}/api/v1/cart/${cartItemToDelete.sku}`)
        .subscribe();
    }
  }

  private saveToCart(item: OrderItemDto) {
    let itemToSave = { ...item };

    const alreadyAddedIdx = this._cart.findIndex(cartItem => cartItem.sku === item.sku);
    if (alreadyAddedIdx === -1) {
      this._cart.unshift(itemToSave);
    } else {
      this._cart[alreadyAddedIdx] = itemToSave;
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
    this._cart = [];
    localStorage.removeItem('cart');
  }

  private updatePrices() {
    const payload: CalculatePricesDto = {
      items: this.cart
    };

    this.http.post<ResponseDto<OrderPricesDto>>(`${API_HOST}/api/v1/cart/prices`, payload)
      .subscribe(response => this.prices = response.data);
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const encoded = encodeURIComponent(email);

    return this.http.get<ResponseDto<boolean>>(`${API_HOST}/api/v1/customer/is-email-available/${encoded}`)
      .pipe( map(response => response.data) );
  }

  fetchOrders() {
    return this.http.get<ResponseDto<OrderDto[]>>(`${API_HOST}/api/v1/customer/order`);
  }
}
