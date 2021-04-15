import { OrderItemDto } from './order-item.dto';
import { ShipmentAddressDto } from './shipment-address.dto';
import { CustomerContactInfoDto } from './customer-contact-info.dto';

export class CustomerDto {
  id: number;
  contactInfo: CustomerContactInfoDto;
  cart: OrderItemDto[];
  addresses: ShipmentAddressDto[];
  isEmailConfirmed: boolean;
  totalOrdersCount: number;
  totalOrdersCost: number;
  discountPercent: number;
  orderIds: number[];
  reviewIds: number[];
  wishlistProductIds: number[];
}

export class UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
