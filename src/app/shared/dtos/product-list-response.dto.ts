import { ResponseDto } from './response.dto';
import { ProductListItemDto } from './product-list-item.dto';
import { FilterDto } from './filter.dto';
import { FilterCategoryDto } from './filter-category.dto';

export class ProductListResponseDto extends ResponseDto<ProductListItemDto[]> {
  filters: FilterDto[];
  categories: FilterCategoryDto[];
}
