import { AddressTypeEnum } from '../enums/address-type.enum';
import { recipientTypeEnum } from '../enums/recipient-type.enum';

export class ShipmentAddressDto {
  isDefault: boolean = false;
  id?: string;
  settlement: string = '';
  settlementFull: string = '';
  settlementId: string = '';
  addressType: AddressTypeEnum = AddressTypeEnum.WAREHOUSE;
  recipientType: recipientTypeEnum = recipientTypeEnum.CUSTOMER;
  addressId: string = '';
  address?: string = '';
  addressFull?: string = '';
  phone: string = '';
  recipientPhone: string = '';
  firstName: string = '';
  lastName: string = '';
  middleName: string = '';
  recipientFirstName: string = '';
  recipientLastName: string = '';
  recipientMiddleName: string = '';
  buildingNumber?: string = '';
  flat?: string = '';
}
