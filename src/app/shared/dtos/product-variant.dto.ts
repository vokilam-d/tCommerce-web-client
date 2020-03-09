export class ProductListItemVariantDto {
  slug: string;
  label: string;
  isSelected: boolean;
}

export class ProductVariantGroupDto {
  label: string;
  variants: ProductListItemVariantDto[];
}
