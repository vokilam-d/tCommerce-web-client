import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services/user/customer.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ShippingAddressDto } from '../../../shared/dtos/shipping-address.dto';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { finalize } from 'rxjs/operators';
import { DetailedCustomerDto } from '../../../shared/dtos/detailed-customer.dto';

@Component({
  selector: 'addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  addressForm: FormGroup;
  formError: string;
  formSuccess: string | null = null;
  isLoading: boolean = false;
  formState: 'add' | 'edit' = null;

  get addresses() { return (this.customerService.customer as DetailedCustomerDto).addresses; }

  constructor(private customerService: CustomerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.formError = null;

    Object.keys(this.addressForm.controls).forEach(controlName => {
      const control = this.addressForm.get(controlName);
      control.updateValueAndValidity();
    });

    if (this.addressForm.invalid) {
      this.validateControls()
    } else {
      this.formState === 'add' ? this.addAddress() : this.editAddress();
    }
  }

  openAddressForm(address?: ShippingAddressDto) {
    if (!address) {
      this.formState = 'add';
      address = new ShippingAddressDto();
    } else {
      this.formState = 'edit';
    }

    this.addressForm = this.formBuilder.group(address);
  }

  private addAddress() {
    const dto: ShippingAddressDto = this.addressForm.value;
    this.isLoading = true;
    this.customerService.addShippingAddress(dto)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.customerService.setCustomer(response.data);
          this.showSuccessMessage(`Адрес успешно добавлен`);
          this.closeForm();
        },
        error => {
          this.showErrorMessage(error);
        }
      );
  }

  private editAddress() {
    const dto: ShippingAddressDto = this.addressForm.value;
    this.isLoading = true;
    this.customerService.editShippingAddress(dto.id, dto)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.customerService.setCustomer(response.data);
          this.showSuccessMessage(`Адрес успешно изменён`);
          this.closeForm();
        },
        error => {
          this.showErrorMessage(error);
        }
      );
  }

  private validateControls() {
    Object.keys(this.addressForm.controls).forEach(controlName => {
      const control = this.addressForm.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    return !control.valid && control.touched;
  }

  closeForm() {
    this.addressForm = null;
    this.formError = null;
    this.formState = null;
  }

  private showSuccessMessage(msg: string) {
    this.formSuccess = msg;
    setTimeout(() => this.formSuccess = null, 5000);
  }

  private showErrorMessage(error: any) {
    this.formError = error.error ? error.error.message : DEFAULT_ERROR_TEXT;
    console.warn(error);
  }
}
