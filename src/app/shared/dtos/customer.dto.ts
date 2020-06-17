import { OrderItemDto } from './order-item.dto';
import { ShipmentAddressDto } from './shipment-address.dto';

export class CustomerDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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

export class UpdateCustomerDto implements Pick<CustomerDto, 'firstName' | 'lastName' | 'email'> {
  firstName: string;
  lastName: string;
  email: string;
}

export class UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
