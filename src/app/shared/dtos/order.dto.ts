import { OrderItemDto } from './order-item.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { ShipmentDto } from './shipment.dto';
import { OrderPricesDto } from './order-prices.dto';
import { OrderContactInfoDto } from './order-contact-info.dto';
import { ContactInfoDto } from './contact-info.dto';

export class AddOrderDto {
  customerContactInfo: OrderContactInfoDto;
  recipientContactInfo: ContactInfoDto;
  address: ShipmentAddressDto;
  paymentMethodId: string;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  note: string;
}

export class OrderDto {
  id: string;
  paymentMethodName: string;
  contactInfo: OrderContactInfoDto;
  shipment: ShipmentDto;
  status: string;
  prices: OrderPricesDto;
  createdAt: Date;
  isOnlinePayment: boolean;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  note: string;

  // custom transforms
  isExpanded: boolean;
}
