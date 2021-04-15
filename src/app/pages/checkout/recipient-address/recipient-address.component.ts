import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IS_EMAIL_REGEX } from '../../../shared/constants';
import { catchError, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { ScrollToService } from '../../../services/scroll-to/scroll-to.service';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { AddressFormComponent, ShipmentPayerMap } from '../../../address-form/address-form.component';
import { AddressTypeEnum } from '../../../shared/enums/address-type.enum';
import { ShipmentAddressDto } from '../../../shared/dtos/shipment-address.dto';
import { ShipmentPayerEnum } from '../../../shared/enums/shipment-payer.enum';

@Component({
  selector: 'recipient-address',
  templateUrl: './recipient-address.component.html',
  styleUrls: ['./recipient-address.component.scss', '../checkout-block.scss']
})
export class RecipientAddressComponent extends NgUnsubscribe implements OnInit {

  addressOptionControl: FormControl | null;

  addressTypeEnum = AddressTypeEnum;

  get customer$() { return this.customerService.customer$; }

  @ViewChild(AddressFormComponent) addressFormCmp: AddressFormComponent;

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private scrollToService: ScrollToService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildAddressOptionControl();
  }

  private buildAddressOptionControl() {
    this.customerService.customer$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(customer => {
        if (customer?.addresses?.length > 0) {
          const defaultAddress = customer.addresses.find(address => address.isDefault) || customer.addresses[0];
          this.addressOptionControl = this.formBuilder.control(defaultAddress);
          this.saveAddressType(defaultAddress.addressType);
        } else {
          this.addressOptionControl = null;
          this.saveAddressType(null);
        }

        this.cdr.markForCheck();
      });
  }

  checkAddressValidity(): boolean {
    if (!this.addressOptionControl?.value) {
      return this.addressFormCmp.checkValidity();
    }

    return true;
  }

  getAddress(): ShipmentAddressDto {
    const address = this.addressOptionControl?.value;
    return address || this.addressFormCmp.getValue();
  }

  private saveAddressType(addressType: AddressTypeEnum) {
    this.orderService.addressType$.next(addressType);
  }

  onAddressChange(address: ShipmentAddressDto) {
    this.saveAddressType(address.addressType);
  }

  getShipmentPayerMap(): ShipmentPayerMap {
    const totalCost = this.customerService.prices.totalCost;
    return new Map([
      [ AddressTypeEnum.WAREHOUSE, totalCost < 1000 ? ShipmentPayerEnum.RECIPIENT : ShipmentPayerEnum.SENDER ],
      [ AddressTypeEnum.DOORS, ShipmentPayerEnum.RECIPIENT ]
    ]);
  }
}
