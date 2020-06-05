import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { ProductDto } from '../../shared/dtos/product.dto';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';
import { toHttpParams } from '../../shared/helpers/to-http-params.function';
import { SortingPaginatingFilterDto } from '../../shared/dtos/spf.dto';
import { API_HOST, SEARCH_QUERY_PARAM } from '../../shared/constants';
import { ProductListResponseDto } from '../../shared/dtos/product-list-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetchProduct(slug: string) {
    return this.http.get<ResponseDto<ProductDto>>(`${API_HOST}/api/v1/products/${slug}`);
  }

  fetchProductsByAutocomplete(query: string) {
    return this.http.get<ProductListResponseDto>(`${API_HOST}/api/v1/products`, { params: { [SEARCH_QUERY_PARAM]: query } });
  }

  fetchProductsByFilters(spf: SortingPaginatingFilterDto) {
    return this.http.get<ProductListResponseDto>(`${API_HOST}/api/v1/products`, { params: toHttpParams(spf) });
  }
}
