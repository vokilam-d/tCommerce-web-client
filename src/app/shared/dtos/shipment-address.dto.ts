import { AddressTypeEnum } from '../enums/address-type.enum';

export class ShipmentAddressDto {
  isDefault: boolean = false;
  id?: string;
  settlement: string = '';
  settlementId: string = '';
  addressType: AddressTypeEnum = AddressTypeEnum.WAREHOUSE;
  addressId: string = '';
  address?: string = '';
  phone: string = '';
  firstName: string = '';
  lastName: string = '';
  middleName: string = '';
  buildingNumber?: string = '';
  flat?: string = '';
}
