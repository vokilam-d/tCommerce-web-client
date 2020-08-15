import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { ProductDto } from '../../shared/dtos/product.dto';
import { toHttpParams } from '../../shared/helpers/to-http-params.function';
import { SortingPaginatingFilterDto } from '../../shared/dtos/spf.dto';
import { API_HOST, SEARCH_QUERY_PARAM, viewedProductsIdsKey } from '../../shared/constants';
import { ProductListResponseDto } from '../../shared/dtos/product-list-response.dto';
import { AddProductQuickReviewDto } from '../../shared/dtos/product-review.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  maxViewedProductsArrLength = 30;

  constructor(private http: HttpClient) {
  }

  fetchProduct(slug: string) {
    return this.http.get<ResponseDto<ProductDto>>(`${API_HOST}/api/v1/products/${slug}`);
  }

  fetchProductsByAutocomplete(query: string) {
    const params = {
      [SEARCH_QUERY_PARAM]: query,
      autocomplete: 'true'
    };

    return this.http.get<ProductListResponseDto>(`${API_HOST}/api/v1/products`, { params });
  }

  fetchProductsByFilters(spf: SortingPaginatingFilterDto) {
    return this.http.get<ProductListResponseDto>(`${API_HOST}/api/v1/products`, { params: toHttpParams(spf) });
  }

  addViewedProductIdToLocalStorage(productId: number) {
    let recentlyViewedProducts: any[] = localStorage.getItem(viewedProductsIdsKey)
      ? JSON.parse(localStorage.getItem(viewedProductsIdsKey))
      : [];

    if (recentlyViewedProducts.length >= this.maxViewedProductsArrLength) {
      recentlyViewedProducts.pop();
    }

    recentlyViewedProducts.unshift(productId);

    recentlyViewedProducts = [...new Set(recentlyViewedProducts)];
    localStorage.setItem(viewedProductsIdsKey, JSON.stringify(recentlyViewedProducts));
  }

  getViewedProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(viewedProductsIdsKey));
  }

  addQuickReview(product: ProductDto, rating: number) {
    const dto: AddProductQuickReviewDto = {
      rating
    };

    return this.http.post<ResponseDto<ProductDto>>(`${API_HOST}/api/v1/products/${product.id}/quick-reviews`, dto);
  }

}
