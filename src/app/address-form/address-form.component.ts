import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ShipmentAddressDto } from '../shared/dtos/shipment-address.dto';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressTypeEnum } from '../shared/enums/address-type.enum';
import { SettlementDto } from '../shared/dtos/settlement.dto';
import { WarehouseDto } from '../shared/dtos/warehouse.dto';
import { StreetDto } from '../shared/dtos/street.dto';
import { takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { ScrollToService } from '../services/scroll-to/scroll-to.service';
import { merge } from 'rxjs';
import { DEFAULT_PHONE_NUMBER_VALUE } from '../shared/constants';
import { CustomValidators } from '../shared/classes/validators';
import { ShipmentPayerEnum } from '../shared/enums/shipment-payer.enum';

export type ShipmentPayerMap = Map<AddressTypeEnum, ShipmentPayerEnum>;

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends NgUnsubscribe implements OnInit, OnChanges {

  addressForm: FormGroup;
  addressTypes: AddressTypeEnum[] = [AddressTypeEnum.WAREHOUSE, AddressTypeEnum.DOORS];

  addressTypeEnum = AddressTypeEnum;
  shipmentPayerEnum = ShipmentPayerEnum;

  get settlementIdControl() {
    return this.addressForm.get(settlementIdProp);
  }

  @Input() address: ShipmentAddressDto = new ShipmentAddressDto();
  @Input() showIsDefault: boolean = true;
  @Input() shipmentPayerMap: ShipmentPayerMap;
  @Output() valueChanged = new EventEmitter<ShipmentAddressDto>();

  constructor(
    private formBuilder: FormBuilder,
    private scrollToService: ScrollToService,
    private elementRef: ElementRef
  ) {
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
      middleName: [address.middleName],
      phone: [address.phone || DEFAULT_PHONE_NUMBER_VALUE, CustomValidators.phoneNumber],
      addressType: [address.addressType, Validators.required],
      settlement: [address.settlement, Validators.required],
      settlementFull: [address.settlement, Validators.required],
      settlementId: [address.settlementId, Validators.required],
      address: [address.address, Validators.required],
      addressFull: [address.address, Validators.required],
      addressId: [address.addressId, Validators.required],
      buildingNumber: address.buildingNumber,
      flat: address.flat
    }

    this.addressForm = this.formBuilder.group(controls);
    this.addressForm.valueChanges.subscribe(address => {
      this.valueChanged.emit(address)
    });

    this.handleAutoResetFields();
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
      if (this.addressForm.get(addressTypeProp).value === AddressTypeEnum.DOORS && !this.addressForm.get(buildingProp).value) {
        isValid = false;
      }

    } else {
      isValid = false;
    }

    if (!isValid) {
      this.validateControls(this.addressForm);
      this.scrollToService.scrollTo({ target: this.elementRef, offset: -50 });
    }
    return isValid;
  }

  getValue(): ShipmentAddressDto {
    return this.addressForm.value;
  }

  onSettlementSelect(settlement: SettlementDto) {
    this.addressForm.get(settlementIdProp).setValue(settlement.id);
    this.addressForm.get(settlementProp).setValue(settlement.nameWithType);
    this.addressForm.get(settlementFullProp).setValue(settlement.fullName);
  }

  onWarehouseSelect(warehouse: WarehouseDto) {
    this.addressForm.get(addressIdProp).setValue(warehouse.id);
    this.addressForm.get(addressProp).setValue(warehouse.name);
    this.addressForm.get(addressFullProp).setValue(warehouse.description);
  }

  onStreetSelect(street: StreetDto) {
    this.addressForm.get(addressIdProp).setValue(street.id);
    this.addressForm.get(addressProp).setValue(street.name);
    this.addressForm.get(addressFullProp).setValue(street.name);
  }

  isOptionalControlInvalid(prop: keyof ShipmentAddressDto) {
    const addressType: AddressTypeEnum = this.addressForm.get(addressTypeProp).value;
    const control = this.addressForm.get(prop);

    switch (prop) {
      case 'buildingNumber':
        return addressType === AddressTypeEnum.DOORS && !control.value && control.touched;
    }
  }

  private handleAutoResetFields() {
    merge(
      this.addressForm.get(addressTypeProp).valueChanges,
      this.addressForm.get(settlementProp).valueChanges
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.addressForm.get(addressIdProp).reset('', { emitEvent: false });
        this.addressForm.get(addressProp).reset('', { emitEvent: false });
        this.addressForm.get(addressFullProp).reset('', { emitEvent: false });
      });

    this.addressForm.get(addressTypeProp).valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((addressType: AddressTypeEnum) => {
        if (addressType === AddressTypeEnum.WAREHOUSE) {
          this.addressForm.get(buildingProp).reset('', { emitEvent: false });
          this.addressForm.get(flatProp).reset('', { emitEvent: false });
        }
      });
  }
}

const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
const addressIdProp: keyof ShipmentAddressDto = 'addressId';
const addressProp: keyof ShipmentAddressDto = 'address';
const addressFullProp: keyof ShipmentAddressDto = 'addressFull';
const settlementIdProp: keyof ShipmentAddressDto = 'settlementId';
const settlementProp: keyof ShipmentAddressDto = 'settlement';
const settlementFullProp: keyof ShipmentAddressDto = 'settlementFull';
const buildingProp: keyof ShipmentAddressDto = 'buildingNumber';
const flatProp: keyof ShipmentAddressDto = 'flat';
