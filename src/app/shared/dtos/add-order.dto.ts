import { CustomerContactInfoDto } from './customer-contact-info.dto';
import { ContactInfoDto } from './contact-info.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { OrderItemDto } from './order-item.dto';

export class AddOrderDto {
  customerContactInfo: CustomerContactInfoDto;
  recipientContactInfo: ContactInfoDto;
  address: ShipmentAddressDto;
  paymentMethodId: string;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  note: string;
}
