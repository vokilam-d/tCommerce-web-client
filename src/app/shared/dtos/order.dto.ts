import { OrderItemDto } from './order-item.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { ShipmentTypeEnum } from '../enums/shipment-type.enum';
import { ShipmentDto } from './shipment.dto';

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
  totalItemsCost: number;
  discountPercent: number;
  discountValue: number;
  discountLabel: string;
  totalCost: number;
  createdAt: Date;
  isOnlinePayment: boolean;

  // custom transforms
  isExpanded: boolean;
}
