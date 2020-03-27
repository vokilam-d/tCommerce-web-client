export class CreateOrUpdateOrderItemDto {
  sku: string;
  qty: number;
}

export class OrderItemDto {
  name: string;
  productId: number;
  variantId: string;
  sku: string;
  originalPrice: number;
  price: number;
  qty: number;
  cost: number;
  discountValue?: number;
  totalCost: number;
  imageUrl: string;
  slug: string;
}
