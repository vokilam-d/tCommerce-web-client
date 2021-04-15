import { OrderItemDto } from './order-item.dto';
import { ShipmentDto } from './shipment.dto';
import { OrderPricesDto } from './order-prices.dto';
import { CustomerContactInfoDto } from './customer-contact-info.dto';

export class OrderDto {
  id: string;
  paymentMethodName: string;
  customerContactInfo: CustomerContactInfoDto;
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
