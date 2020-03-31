import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toHttpParams } from '../../shared/helpers/to-http-params.function';
import { ResponseDto } from '../../shared/dtos/response.dto';
import {
  AddProductReviewCommentDto,
  AddProductReviewDto,
  ProductReviewDto
} from '../../shared/dtos/product-review.dto';
import { API_HOST } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  constructor(private http: HttpClient) { }

  fetchProductReviews(productId: number) {
    return this.http.get<ResponseDto<ProductReviewDto[]>>(`${API_HOST}/api/v1/product-reviews`, { params: toHttpParams({ productId }) });
  }

  addReview(reviewDto: AddProductReviewDto) {
    return this.http.post<ResponseDto<ProductReviewDto>>(`${API_HOST}/api/v1/product-reviews`, reviewDto);
  }

  vote(reviewId: number) {
    return this.http.post<ResponseDto<ProductReviewDto>>(`${API_HOST}/api/v1/product-reviews/${reviewId}/vote`, {});
  }

  downvote(reviewId: number) {
    return this.http.post<ResponseDto<ProductReviewDto>>(`${API_HOST}/api/v1/product-reviews/${reviewId}/downvote`, {});
  }

  addComment(reviewId: number, commentDto: AddProductReviewCommentDto) {
    return this.http.post<ResponseDto<ProductReviewDto>>(`${API_HOST}/api/v1/product-reviews/${reviewId}/comment`, commentDto);
  }
}
