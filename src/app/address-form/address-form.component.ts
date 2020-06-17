import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShipmentAddressDto } from '../shared/dtos/shipment-address.dto';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressTypeEnum } from '../shared/enums/address-type.enum';
import { SettlementDto } from '../shared/dtos/settlement.dto';
import { WarehouseDto } from '../shared/dtos/warehouse.dto';
import { StreetDto } from '../shared/dtos/street.dto';
import { takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { ScrollToService } from '../shared/services/scroll-to/scroll-to.service';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends NgUnsubscribe implements OnInit, OnChanges {

  addressForm: FormGroup;
  addressTypes = [{ data: AddressTypeEnum.WAREHOUSE, view: 'В отделение' }, { data: AddressTypeEnum.DOORS, view: 'Адресная курьером' }];
  addressTypeEnum = AddressTypeEnum;
  get settlementIdControl() {
    const settlementIdProp: keyof ShipmentAddressDto = 'settlementId';
    return this.addressForm.get(settlementIdProp);
  }

  @Input() address: ShipmentAddressDto = new ShipmentAddressDto();
  @Input() showIsDefault: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private scrollToService: ScrollToService,
              private elementRef: ElementRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.address?.currentValue) {
      this.buildAddressForm(changes.address.currentValue);
    }
  }

  ngOnInit() {
    if (!this.addressForm) {
      this.buildAddressForm(this.address);
    }
  }

  private buildAddressForm(address: ShipmentAddressDto) {
    const controls: Partial<Record<keyof ShipmentAddressDto, any>> = {
      isDefault: [address.isDefault],
      firstName: [address.firstName, Validators.required],
      lastName: [address.lastName, Validators.required],
      middleName: [address.middleName, Validators.required],
      phone: [address.phone, Validators.required],
      addressType: [address.addressType, Validators.required],
      settlement: [address.settlement, Validators.required],
      settlementId: [address.settlementId, Validators.required],
      address: [address.address, Validators.required],
      addressId: [address.addressId, Validators.required],
      buildingNumber: address.buildingNumber,
      flat: address.flat
    }

    this.addressForm = this.formBuilder.group(controls);

    const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
    const addressIdProp: keyof ShipmentAddressDto = 'addressId';
    const addressProp: keyof ShipmentAddressDto = 'address';
    this.addressForm.get(addressTypeProp).valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => {
        this.addressForm.get(addressIdProp).reset('');
        this.addressForm.get(addressProp).reset('');
      })
  }

  private validateControls(form: FormGroup | FormArray) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateControls(control);
      }
    });
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }

  checkValidity(): boolean {
    let isValid: boolean = true;

    if (this.addressForm.valid) {
      const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
      const buildingProp: keyof ShipmentAddressDto = 'buildingNumber';

      if (this.addressForm.get(addressTypeProp).value === AddressTypeEnum.DOORS && !this.addressForm.get(buildingProp).value) {
        isValid = false;
      }

    } else {
      isValid = false;
      this.validateControls(this.addressForm);
    }

    if (!isValid) {
      this.scrollToService.scrollTo({ target: this.elementRef, offset: -50 });
    }
    return isValid;
  }

  getValue(): ShipmentAddressDto {
    return this.addressForm.value;
  }

  onSettlementSelect(settlement: SettlementDto) {
    const settlementIdProp: keyof ShipmentAddressDto = 'settlementId';
    const settlementProp: keyof ShipmentAddressDto = 'settlement';

    this.addressForm.get(settlementIdProp).setValue(settlement.id);
    this.addressForm.get(settlementProp).setValue(settlement.fullName);
  }

  onWarehouseSelect(warehouse: WarehouseDto) {
    const addressIdProp: keyof ShipmentAddressDto = 'addressId';
    const addressProp: keyof ShipmentAddressDto = 'address';

    this.addressForm.get(addressIdProp).setValue(warehouse.id);
    this.addressForm.get(addressProp).setValue(warehouse.description);
  }

  onStreetSelect(street: StreetDto) {
    const addressIdProp: keyof ShipmentAddressDto = 'addressId';
    const addressProp: keyof ShipmentAddressDto = 'address';

    this.addressForm.get(addressIdProp).setValue(street.id);
    this.addressForm.get(addressProp).setValue(street.name);
  }

  isOptionalControlInvalid(prop: keyof ShipmentAddressDto) {
    const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
    const addressType: AddressTypeEnum = this.addressForm.get(addressTypeProp).value;
    const control = this.addressForm.get(prop);

    switch (prop) {
      case 'buildingNumber':
        return addressType === AddressTypeEnum.DOORS && !control.value && control.touched;
    }
  }

  setAddressType(type: { view: string; data: AddressTypeEnum }) {
    const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
    this.addressForm.get(addressTypeProp).setValue(type.data);
  }
}
