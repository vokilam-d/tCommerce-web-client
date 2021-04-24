import { ShipmentStatusEnum } from '../enums/shipment-status.enum';
import { ShipmentTypeEnum } from '../enums/shipment-type.enum';
import { ShipmentPayerEnum } from '../enums/shipment-payer.enum';
import { ShipmentCounterpartyDto } from './shipment-counterparty.dto';

export class ShipmentDto {
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  status?: ShipmentStatusEnum;
  statusDescription?: string;
  sender?: ShipmentCounterpartyDto;
  recipient?: ShipmentCounterpartyDto;
  shipmentType?: ShipmentTypeEnum = ShipmentTypeEnum.WAREHOUSE_WAREHOUSE;
  payerType?: ShipmentPayerEnum = ShipmentPayerEnum.RECIPIENT;
  backwardMoneyDelivery?: string;
  shippingMethodDescription?: string;
}
