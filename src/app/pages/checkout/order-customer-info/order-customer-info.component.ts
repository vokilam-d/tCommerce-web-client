import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShipmentAddressDto } from '../../../shared/dtos/shipment-address.dto';
import { isEmailRegex } from '../../../shared/constants';
import { catchError, debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { ScrollToService } from '../../../shared/services/scroll-to/scroll-to.service';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';

@Component({
  selector: 'order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss', '../checkout-block.scss']
})
export class OrderCustomerInfoComponent extends NgUnsubscribe implements OnInit {

  form: FormGroup;
  emailControl: FormControl;
  get isLoggedIn() { return this.customerService.isLoggedIn; }

  @ViewChild('formRef') formRef: ElementRef;

  constructor(private customerService: CustomerService,
              private orderService: OrderService,
              private scrollToService: ScrollToService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildEmailControl();
    this.buildForm();
  }

  private buildEmailControl() {
    this.emailControl = this.formBuilder.control(
      this.orderService.email,
      [Validators.pattern(isEmailRegex), Validators.required]
    );

    this.emailControl.valueChanges
      .pipe(
        debounceTime(1000),
        tap(value => this.orderService.email = value),
        switchMap(email => this.customerService.isEmailAvailable(email)),
        catchError((err, caught) => caught),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(isEmailAvailable => {
        console.log({isEmailAvailable});
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group(this.orderService.address);
    this.form.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(value => this.orderService.address = value);
  }

  isEmailInvalid() {
    return !this.emailControl.valid && this.emailControl.touched;
  }

  private validateControl(control: AbstractControl) {
    control.markAsTouched({ onlySelf: true });
  }

  private validateFormControls() {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      this.validateControl(control);
    });
  }

  isControlInvalid(controlName: keyof ShipmentAddressDto | string): boolean {
    const control = this.form.get(controlName);
    return !control.valid && control.touched;
  }

  checkInfoValidity(): boolean {
    let isInfoValid: boolean = false;

    if (this.isLoggedIn) {
      isInfoValid = true;
    } else {
      isInfoValid = this.form.valid;
      this.validateControl(this.emailControl);
      this.validateFormControls();
    }

    if (!isInfoValid) {
      this.scrollToService.scrollTo({ target: this.formRef, offset: -40 });
    }

    return isInfoValid;
  }
}
