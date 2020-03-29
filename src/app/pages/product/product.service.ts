import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { ProductDto } from '../../shared/dtos/product.dto';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';
import { toHttpParams } from '../../shared/helpers/to-http-params.function';
import { SortingPaginatingFilterDto } from '../../shared/dtos/spf.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetchProduct(slug: string) {
    return this.http.get<ResponseDto<ProductDto>>(`http://173.249.23.253:3080/api/v1/products/${slug}`);
  }

  fetchProductsByFilters(spf: SortingPaginatingFilterDto) {
    return this.http.get<ResponseDto<ProductListItemDto[]>>(`http://173.249.23.253:3080/api/v1/products`, { params: toHttpParams(spf) });
  }
}
