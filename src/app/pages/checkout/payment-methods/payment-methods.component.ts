import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';
import { ResponseDto } from '../../../shared/dtos/response.dto';
import { finalize, takeUntil } from 'rxjs/operators';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { PaymentMethodDto } from '../../../shared/dtos/payment-method.dto';

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
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.fetchMethods();
  }

  fetchMethods() {
    this.isLoading = true;
    this.http.get<ResponseDto<PaymentMethodDto[]>>(`http://173.249.23.253:3080/api/v1/payment-method`)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.error = null;
          this.methods = response.data;
          this.buildForm();
        },
        error => {
          this.error = error.error ? error.error.message : DEFAULT_ERROR_TEXT;
        }
      );
  }

  private buildForm() {
    this.methodControl = this.formBuilder.control('');

    this.methodControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(methodId => {
        const selectedMethod = this.methods.find(method => method.id === methodId);
        this.orderService.paymentMethod = selectedMethod;
      });

    this.methodControl.setValue(this.methods[0].id);
  }
}
