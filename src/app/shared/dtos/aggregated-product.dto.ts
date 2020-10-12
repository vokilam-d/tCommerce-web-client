export class AggregatedProductDto {
  mediaUrl: string;
  slug: string;
  name: string;
  sku: string;
  price: number;

  // custom transforms
  isLoading: boolean;
}
