export class ProductListItemVariantDto {
  slug: string;
  label: string;
  isSelected: boolean;
  isInStock: boolean;
  color: string;
}

export class ProductVariantGroupDto {
  label: string;
  selectedVariantLabel: string;
  hasColor: boolean;
  variants: ProductListItemVariantDto[];
}
