import { OrderItemDto } from './order-item.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { ShipmentTypeEnum } from '../enums/shipment-type.enum';
import { ShipmentDto } from './shipment.dto';

export class AddOrderDto {
  email: string;
  address: ShipmentAddressDto;
  paymentMethodId: string;
  shipmentType?: ShipmentTypeEnum;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  note: string;
}

export class OrderDto extends AddOrderDto {
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
