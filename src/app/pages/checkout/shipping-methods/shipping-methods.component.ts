import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../../shared/dtos/response.dto';
import { ShippingMethodDto } from '../../../shared/dtos/shipping-method.dto';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { finalize, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { OrderService } from '../order.service';

@Component({
  selector: 'shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.scss', '../checkout-block.scss']
})
export class ShippingMethodsComponent extends NgUnsubscribe implements OnInit {

  methods: ShippingMethodDto[];
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
    this.http.get<ResponseDto<ShippingMethodDto[]>>(`http://localhost:3500/api/v1/shipping-method`)
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
        this.orderService.shippingMethod = selectedMethod;
      });

    this.methodControl.setValue(this.methods[0].id);
  }
}
