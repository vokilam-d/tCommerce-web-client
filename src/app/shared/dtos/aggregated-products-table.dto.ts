import { AggregatedProductDto } from './aggregated-product.dto';

export class AggregatedProductsTableDto {
  name: string;
  products: AggregatedProductDto[];
}
