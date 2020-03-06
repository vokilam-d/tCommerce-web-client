export class ProductListItemVariantDto {
  slug: string;
  label: string;
  isSelected: boolean;
}

export class ProductListItemVariantGroupDto {
  label: string;
  variants: ProductListItemVariantDto[];
}

export class ProductListItemDto {
  productId: number;
  variantId: string;
  name: string;
  mediaUrl: string;
  mediaHoverUrl: string;
  mediaAltText: string;
  priceInDefaultCurrency: number;
  isInStock: boolean;
  sku: string;
  slug: string;
  variantGroups: ProductListItemVariantGroupDto[];
}
