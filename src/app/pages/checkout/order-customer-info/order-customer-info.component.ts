import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { isEmailRegex } from '../../../shared/constants';
import { catchError, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { ScrollToService } from '../../../shared/services/scroll-to/scroll-to.service';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { AddressFormComponent } from '../../../address-form/address-form.component';
import { AddressTypeEnum } from '../../../shared/enums/address-type.enum';
import { ShipmentAddressDto } from '../../../shared/dtos/shipment-address.dto';

@Component({
  selector: 'order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss', '../checkout-block.scss']
})
export class OrderCustomerInfoComponent extends NgUnsubscribe implements OnInit {

  emailControl: FormControl;
  addressOptionControl: FormControl | null;
  addressTypes = AddressTypeEnum;

  get customer$() { return this.customerService.customer$; }

  @ViewChild('emailRef') emailRef: ElementRef;
  @ViewChild(AddressFormComponent) addressFormCmp: AddressFormComponent;

  constructor(private customerService: CustomerService,
              private orderService: OrderService,
              private cdr: ChangeDetectorRef,
              private scrollToService: ScrollToService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.handleEmail();
    this.buildAddressOptionControl();
  }

  private handleEmail() {
    this.emailControl = this.formBuilder.control('', [Validators.pattern(isEmailRegex), Validators.required]);

    this.emailControl.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(1000),
        switchMap(email => this.customerService.isEmailAvailable(email)),
        catchError((err, caught) => caught)
      )
      .subscribe(isEmailAvailable => {
        console.log({ isEmailAvailable });
      });
  }

  private buildAddressOptionControl() {
    this.customerService.customer$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(customer => {
        if (customer?.addresses?.length > 0) {
          const defaultAddress = customer.addresses.find(address => address.isDefault) || customer.addresses[0];
          this.addressOptionControl = this.formBuilder.control(defaultAddress);
        } else {
          this.addressOptionControl = null;
        }

        this.cdr.markForCheck();
      });
  }

  isEmailInvalid() {
    return !this.emailControl.valid && this.emailControl.touched;
  }

  private validateEmailControl() {
    this.emailControl.markAsTouched({ onlySelf: true });
  }

  checkInfoValidity(): boolean {
    if (!this.customerService.customer && this.emailControl.invalid) {
      this.validateEmailControl();
      this.scrollToService.scrollTo({ target: this.emailRef, offset: -40 });
      return false;
    }

    if (!this.addressOptionControl?.value) {
      return this.addressFormCmp.checkValidity();
    }

    return true;
  }

  getEmail(): string {
    return this.customerService.customerEmail || this.emailControl.value;
  }

  getAddress(): ShipmentAddressDto {
    const address = this.addressOptionControl?.value;
    return address || this.addressFormCmp.getValue();
  }
}
