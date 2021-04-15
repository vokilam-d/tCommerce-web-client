import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer/customer.service';
import { IS_EMAIL_REGEX } from '../shared/constants';
import { catchError, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { CustomerDto } from '../shared/dtos/customer.dto';
import { ContactInfoDto } from '../shared/dtos/contact-info.dto';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { CustomerContactInfoDto } from '../shared/dtos/customer-contact-info.dto';

@Component({
  selector: 'customer-contact-info',
  templateUrl: './customer-contact-info.component.html',
  styleUrls: ['./customer-contact-info.component.scss']
})
export class CustomerContactInfoComponent extends NgUnsubscribe implements OnInit {

  emailControl: FormControl = new FormControl('', [Validators.pattern(IS_EMAIL_REGEX), Validators.required]);
  customer: CustomerDto;
  contactInfo: ContactInfoDto;
  isFormVisible: boolean = false;

  get customer$() { return this.customerService.customer$; }

  @ViewChild(ContactInfoComponent) contactInfoCmp: ContactInfoComponent;

  constructor(
    private customerService: CustomerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.onInit();
  }

  private onInit() {
    this.customer$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(customer => {
        this.customer = customer;

        if (this.customer) {
          this.contactInfo = customer.contactInfo;
          this.setCustomerEmail();
        } else {
          this.contactInfo = new ContactInfoDto();
          this.handleEmail();
        }
    });
  }

  private handleEmail() {
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

  private setCustomerEmail() {
    this.emailControl.setValue(this.customer.contactInfo.email);
  }

  checkValidity(): boolean {
    let isValid: boolean = true;

    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched({ onlySelf: true });
      isValid = false;
    }

    if (!this.contactInfoCmp.checkValidity()) {
      isValid = false;
    }

    return isValid;
  }

  getValue(): CustomerContactInfoDto {
    return {
      email: this.emailControl.value,
      ...this.contactInfoCmp.getValue()
    };
  }

  isEmailInvalid() {
    return this.emailControl.invalid && this.emailControl.touched;
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
