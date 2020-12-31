import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';
import { ResponseDto } from '../../../shared/dtos/response.dto';
import { finalize, takeUntil } from 'rxjs/operators';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { PaymentMethodDto } from '../../../shared/dtos/payment-method.dto';
import { AddressTypeEnum } from '../../../shared/enums/address-type.enum';
import { PaymentTypeEnum } from '../../../shared/enums/payment-type.enum';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss', '../checkout-block.scss']
})
export class PaymentMethodsComponent extends NgUnsubscribe implements OnInit {

  methods: PaymentMethodDto[];
  methodControl: FormControl;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient,
              private orderService: OrderService,
              private customerService: CustomerService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.fetchMethods();
  }

  fetchMethods() {
    this.error = null;
    this.isLoading = true;
    this.http.get<ResponseDto<PaymentMethodDto[]>>(`${API_HOST}/api/v1/payment-method`)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.error = null;
          this.methods = response.data;
          this.buildForm();
        },
        error => {
          this.error = error.error?.message || DEFAULT_ERROR_TEXT;
        }
      );
  }

  private buildForm() {
    this.methodControl = this.formBuilder.control(null);

    this.methodControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(method => {
        this.orderService.paymentMethod = method;
      });

    this.handleMethodsState();
  }

  private handleMethodsState() { // todo wow so ugly, much refactor
    const cashOnDeliveryMethod = this.methods.find(method => method.paymentType === PaymentTypeEnum.CASH_ON_DELIVERY);
    if (!cashOnDeliveryMethod) { return; }
    cashOnDeliveryMethod.disabledReasons = [];

    this.orderService.addressType$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(addressType => {
        const disableReason = 'Наложенный платёж недоступен при адресной доставке';
        if (addressType === AddressTypeEnum.DOORS) {
          if (!cashOnDeliveryMethod.disabledReasons.includes(disableReason)) {
            cashOnDeliveryMethod.disabledReasons.push(disableReason);
          }
        } else {
          const reasonIdx = cashOnDeliveryMethod.disabledReasons.indexOf(disableReason);
          if (reasonIdx > -1) { cashOnDeliveryMethod.disabledReasons.splice(reasonIdx, 1); }
        }

        cashOnDeliveryMethod.disabledState = cashOnDeliveryMethod.disabledReasons.length ? true : null;

        if (this.methodControl.value === cashOnDeliveryMethod) {
          this.methodControl.setValue(null);
        }
      });

    const disallowedItem = this.customerService.cart.find(item => item.name.toLowerCase().match(/сусаль([ ,])/g));
    if (disallowedItem) {
      cashOnDeliveryMethod.disabledState = true;
      cashOnDeliveryMethod.disabledReasons.push('Наложенный платёж недоступен для сусального золота');
    }
  }
}
