import { ProductListItemDto } from './product-list-item.dto';

export class CreateOrUpdateOrderItemDto {
  sku: string;
  qty: number;
}

export class OrderItemDto {
  name: string;
  productId: number;
  variantId: string;
  sku: string;
  price: number;
  qty: number;
  cost: number;
  discountValue?: number;
  totalCost: number;
  imageUrl: string;
  slug: string;
  crossSellProducts: ProductListItemDto[];
}
