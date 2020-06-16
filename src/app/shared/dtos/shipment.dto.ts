import { ShipmentAddressDto } from './shipment-address.dto';
import { ShipmentStatusEnum } from '../enums/shipment-status.enum';
import { ShipmentTypeEnum } from '../enums/shipment-type.enum';
import { ShipmentPayerEnum } from '../enums/shipment-payer.enum';
import { ShipmentPaymentMethodEnum } from '../enums/shipment-payment-method.enum';

export class ShipmentDto {
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  status?: ShipmentStatusEnum;
  statusDescription?: string;
  recipient?: ShipmentAddressDto;
  shipmentType?: ShipmentTypeEnum = ShipmentTypeEnum.WAREHOUSE_WAREHOUSE;
  payerType?: ShipmentPayerEnum = ShipmentPayerEnum.RECIPIENT;
  paymentMethod?: ShipmentPaymentMethodEnum = ShipmentPaymentMethodEnum.CASH;
  date?: string;
  backwardMoneyDelivery?: string;
}
