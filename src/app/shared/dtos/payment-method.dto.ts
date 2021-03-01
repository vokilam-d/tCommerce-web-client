import { PaymentTypeEnum } from '../enums/payment-type.enum';

export class PaymentMethodDto {
  id: string;
  name: string;
  price: number;
  paymentType: PaymentTypeEnum;
  icon?: string;

  // custom transforms
  disabledState: null | true;
  disabledReasons: string[];
}
