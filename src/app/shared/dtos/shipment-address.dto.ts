import { AddressTypeEnum } from '../enums/address-type.enum';
import { RecipientTypeEnum } from '../enums/recipient-type.enum';

export class ShipmentAddressDto {
  isDefault: boolean = false;
  id?: string;
  settlementName: string = '';
  settlementNameFull: string = '';
  settlementId: string = '';
  type: AddressTypeEnum = AddressTypeEnum.WAREHOUSE;
  recipientType: RecipientTypeEnum = RecipientTypeEnum.CUSTOMER;
  addressId: string = '';
  addressName?: string = '';
  addressNameFull?: string = '';
  buildingNumber?: string = '';
  flat?: string = '';
}
