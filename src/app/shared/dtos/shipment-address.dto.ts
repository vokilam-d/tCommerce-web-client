import { AddressTypeEnum } from '../enums/address-type.enum';

export class ShipmentAddressDto {
  isDefault: boolean = false;
  id?: string;
  settlement: string = '';
  settlementFull: string = '';
  settlementId: string = '';
  addressType: AddressTypeEnum = AddressTypeEnum.WAREHOUSE;
  addressId: string = '';
  address?: string = '';
  addressFull?: string = '';
  phone: string = '';
  firstName: string = '';
  lastName: string = '';
  middleName: string = '';
  buildingNumber?: string = '';
  flat?: string = '';
}
