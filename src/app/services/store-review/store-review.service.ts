import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { API_HOST } from '../../shared/constants';
import { AddStoreReviewDto, StoreReviewDto } from '../../shared/dtos/store-review.dto';
import { SortingPaginatingFilterDto } from '../../shared/dtos/spf.dto';
import { toHttpParams } from '../../shared/helpers/to-http-params.function';

@Injectable({
  providedIn: 'root'
})
export class StoreReviewService {

  storeReviewsCount: number;
  averageRating: number;

  constructor(private http: HttpClient) {
    this.setReviewsCount();
    this.setAverageRating();
  }

  setReviewsCount() {
    this.http.get<ResponseDto<number>>(`${API_HOST}/api/v1/store-reviews/count`)
      .subscribe(
        response => {
          this.storeReviewsCount = response.data;
        },
        err => {
          console.warn(`${new Date().toISOString()} - Could not set store reviews count`, err.message);
        }
      );
  }

  fetchAllReviews(spf: SortingPaginatingFilterDto) {
    return this.http.get<ResponseDto<StoreReviewDto[]>>(`${API_HOST}/api/v1/store-reviews`, { params: toHttpParams(spf) });
  }

  addReview(reviewDto: AddStoreReviewDto) {
    return this.http.post<ResponseDto<StoreReviewDto>>(`${API_HOST}/api/v1/store-reviews`, reviewDto);
  }

  vote(reviewId: number) {
    return this.http.post<ResponseDto<StoreReviewDto>>(`${API_HOST}/api/v1/store-reviews/${reviewId}/vote`, {});
  }

  downvote(reviewId: number) {
    return this.http.post<ResponseDto<StoreReviewDto>>(`${API_HOST}/api/v1/store-reviews/${reviewId}/downvote`, {});
  }

  setAverageRating(): void {
    this.http.get<ResponseDto<number>>(`${API_HOST}/api/v1/store-reviews/avg-rating`)
      .subscribe(response => {
        this.averageRating = response.data;
      });
  }
}
