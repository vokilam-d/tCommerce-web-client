export class AggregatedProductDto {
  mediaUrl: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  isInStock: boolean;

  // custom transforms
  isLoading: boolean;
}
