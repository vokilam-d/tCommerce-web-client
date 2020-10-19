import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { ProductDto, ProductResponseDto } from '../../shared/dtos/product.dto';
import { toHttpParams } from '../../shared/helpers/to-http-params.function';
import { SortingPaginatingFilterDto } from '../../shared/dtos/spf.dto';
import { API_HOST, SEARCH_QUERY_PARAM, VIEWED_PRODUCT_IDS_KEY } from '../../shared/constants';
import { ProductListResponseDto } from '../../shared/dtos/product-list-response.dto';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';
import { AddProductQuickReviewDto } from '../../shared/dtos/product-review.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  maxViewedProductsArrLength = 30;

  constructor(private http: HttpClient) {
  }

  fetchProduct(slug: string) {
    return this.http.get<ProductResponseDto>(`${API_HOST}/api/v1/products/${slug}`);
  }

  fetchProductsByFilters(spf: SortingPaginatingFilterDto) {
    return this.http.get<ProductListResponseDto>(`${API_HOST}/api/v1/products`, { params: toHttpParams(spf) });
  }

  fetchRecentlyAddedProducts() {
    return this.http.get<ResponseDto<ProductListItemDto[]>>(`${API_HOST}/api/v1/products?lastAdded=true`);
  }

  addViewedProductIdToLocalStorage(productId: number) {
    let recentlyViewedProducts: any[] = localStorage.getItem(VIEWED_PRODUCT_IDS_KEY)
      ? JSON.parse(localStorage.getItem(VIEWED_PRODUCT_IDS_KEY))
      : [];

    if (recentlyViewedProducts.length >= this.maxViewedProductsArrLength) {
      recentlyViewedProducts.pop();
    }

    recentlyViewedProducts.unshift(productId);

    recentlyViewedProducts = [...new Set(recentlyViewedProducts)];
    localStorage.setItem(VIEWED_PRODUCT_IDS_KEY, JSON.stringify(recentlyViewedProducts));
  }

  getViewedProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(VIEWED_PRODUCT_IDS_KEY));
  }

  addQuickReview(product: ProductDto, rating: number) {
    const dto: AddProductQuickReviewDto = {
      rating
    };

    return this.http.post<ResponseDto<ProductDto>>(`${API_HOST}/api/v1/products/${product.id}/quick-reviews`, dto);
  }

  incrementViewsCount(id: string) {
    return this.http.post<ResponseDto<null>>(`${API_HOST}/api/v1/products/${id}/views-count`, { });
  }
}
