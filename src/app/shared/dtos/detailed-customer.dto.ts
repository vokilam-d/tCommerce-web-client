import { CustomerDto } from './customer.dto';
import { ShipmentAddressDto } from './shipment-address.dto';

export class DetailedCustomerDto extends CustomerDto {
  addresses: ShipmentAddressDto[];
  isEmailConfirmed: boolean;
  totalOrdersCount: number;
  totalOrdersCost: number;
  discountPercent: number;
  orderIds: number[];
  reviewIds: number[];
  wishlistProductIds: number[];
}
