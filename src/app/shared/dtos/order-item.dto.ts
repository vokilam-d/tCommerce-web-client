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
  oldPrice: number;
  qty: number;
  cost: number;
  oldCost: number;
  imageUrl: string;
  slug: string;
  crossSellProducts: ProductListItemDto[];
}
