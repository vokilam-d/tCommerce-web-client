import { AddressTypeEnum } from '../enums/address-type.enum';
import { RecipientTypeEnum } from '../enums/recipient-type.enum';

export class ShipmentAddressDto {
  isDefault: boolean = false;
  id?: string;
  settlement: string = '';
  settlementFull: string = '';
  settlementId: string = '';
  addressType: AddressTypeEnum = AddressTypeEnum.WAREHOUSE;
  recipientType: RecipientTypeEnum = RecipientTypeEnum.CUSTOMER;
  addressId: string = '';
  address?: string = '';
  addressFull?: string = '';
  buildingNumber?: string = '';
  flat?: string = '';
}
