import { CustomerDto } from './customer.dto';
import { ShippingAddressDto } from './shipping-address.dto';

export class AccountDto extends CustomerDto {
  addresses: ShippingAddressDto[];
  isEmailConfirmed: boolean;
  totalOrdersCount: number;
  totalOrdersCost: number;
  discountPercent: number;
  orderIds: number[];
  reviewIds: number[];
  wishlistProductIds: number[];
}

