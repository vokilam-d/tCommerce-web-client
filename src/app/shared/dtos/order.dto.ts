import { OrderItemDto } from './order-item.dto';
import { ShippingAddressDto } from './shipping-address.dto';

export class AddOrderDto {
  email: string;
  address: ShippingAddressDto;
  paymentMethodId: string;
  shippingMethodId: string;
  isCallbackNeeded: boolean;
  items: OrderItemDto[];
  note: string;
}

export class OrderDto extends AddOrderDto {
  id: string;
  shippingMethodName: string;
  paymentMethodName: string;
  novaposhtaTrackingId: string;
  status: any;
  totalItemsCost: number;
  discountPercent: number;
  discountValue: number;
  discountLabel: string;
  totalCost: number;
}
