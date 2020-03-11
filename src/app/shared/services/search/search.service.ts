import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../pages/product/product.service';
import { ProductListItemDto } from '../../dtos/product-list-item.dto';
import { ResponseDto } from '../../dtos/response.dto';
import { SortingPaginatingFilterDto } from '../../dtos/spf.dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private productService: ProductService) { }

  autocompleteProducts(query: string): Observable<ResponseDto<ProductListItemDto[]>> {
    const spf = new SortingPaginatingFilterDto();
    spf.name = query;
    spf.limit = 5;
    spf.page = 1;

    return this.productService.fetchProductsByFilters(spf);
  }
}
