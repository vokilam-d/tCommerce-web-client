import { ProductVariantGroupDto } from './product-variant.dto';
import { ProductLabelTypeEnum } from '../enums/product-label-type.enum';

export class ProductListItemDto {
  id: string;
  productId: number;
  variantId: string;
  name: string;
  mediaUrl: string;
  label: {
    type: ProductLabelTypeEnum,
    text: string
  }
  mediaHoverUrl: string;
  mediaAltText: string;
  price: number;
  oldPrice: number;
  isInStock: boolean;
  sku: string;
  slug: string;
  variantGroups: ProductVariantGroupDto[];
  reviewsAvgRating: number;
  allReviewsCount: number;
}
