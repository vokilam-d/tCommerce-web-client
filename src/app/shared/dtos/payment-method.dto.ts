import { PaymentTypeEnum } from '../enums/payment-type.enum';

export class PaymentMethodDto {
  id: string;
  name: string;
  price: number;
  paymentType: PaymentTypeEnum;

  // custom transforms
  disabledState: null | true;
}
