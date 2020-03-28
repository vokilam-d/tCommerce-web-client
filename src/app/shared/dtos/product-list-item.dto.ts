import { ProductVariantGroupDto } from './product-variant.dto';

export class ProductListItemDto {
  productId: number;
  variantId: string;
  name: string;
  mediaUrl: string;
  mediaHoverUrl: string;
  mediaAltText: string;
  price: number;
  isInStock: boolean;
  sku: string;
  slug: string;
  variantGroups: ProductVariantGroupDto[];
}
