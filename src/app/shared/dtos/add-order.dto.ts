import { OrderContactInfoDto } from './order-contact-info.dto';
import { ContactInfoDto } from './contact-info.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { OrderItemDto } from './order-item.dto';

export class AddOrderDto {
  customerContactInfo: OrderContactInfoDto;
  recipientContactInfo: ContactInfoDto;
  address: ShipmentAddressDto;
  paymentMethodId: string;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  note: string;
}
