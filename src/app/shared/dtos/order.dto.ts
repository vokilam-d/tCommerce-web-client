import { OrderItemDto } from './order-item.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { ShipmentTypeEnum } from '../enums/shipment-type.enum';
import { ShipmentDto } from './shipment.dto';
import { OrderPricesDto } from './order-prices.dto';

class BaseOrderDto {
  email: string;
  paymentMethodId: string;
  shipmentType?: ShipmentTypeEnum;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  clientNote: string;
}

export class AddOrderDto extends BaseOrderDto {
  address: ShipmentAddressDto;
}

export class OrderDto extends BaseOrderDto {
  id: string;
  shippingMethodName: string;
  paymentMethodName: string;
  shipment: ShipmentDto;
  status: any;
  prices: OrderPricesDto;
  createdAt: Date;
  isOnlinePayment: boolean;

  // custom transforms
  isExpanded: boolean;
}
