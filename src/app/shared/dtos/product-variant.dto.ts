export class ProductListItemVariantDto {
  slug: string;
  label: string;
  isSelected: boolean;
  isInStock: boolean;
}

export class ProductVariantGroupDto {
  label: string;
  selectedVariantLabel: string;
  variants: ProductListItemVariantDto[];
}
