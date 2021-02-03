import { MetaTagsDto } from './meta-tags.dto';
import { MediaDto } from './media.dto';
import { ProductVariantGroupDto } from './product-variant.dto';
import { BreadcrumbDto } from './breadcrumb.dto';
import { SafeHtml } from '@angular/platform-browser';
import { LinkedProductDto } from './linked-product.dto';
import { ResponseDto } from './response.dto';
import { LinkedCategoryDto } from './linked-category.dto';

export class ProductCharacteristic {
  label: string;
  code: string;
  value: string;
}

export class ProductCategoryDto {
  id: number;
  name: string;
  slug: string;
}

export class ProductDto {
  id: string;
  productId: number;
  variantId: string;
  isInStock: boolean;
  categories: ProductCategoryDto[];
  variantGroups: ProductVariantGroupDto[];
  characteristics: ProductCharacteristic[];
  breadcrumbs: BreadcrumbDto[];
  fullDescription: string;
  shortDescription: string;
  medias: MediaDto[];
  metaTags: MetaTagsDto;
  name: string;
  price: number;
  oldPrice: number;
  reviewsAvgRating: number;
  allReviewsCount: number;
  textReviewsCount: number;
  sku: string;
  slug: string;
  vendorCode: string;
  gtin: string;
  relatedProducts: LinkedProductDto[];
  isDiscountApplicable: boolean;
  additionalServiceIds: number[];
  label: string;

  safeFullDescription: SafeHtml;
}

export class ProductResponseDto extends ResponseDto<ProductDto> {
  categories: LinkedCategoryDto[];
}
