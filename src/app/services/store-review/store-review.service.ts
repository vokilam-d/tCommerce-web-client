import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { API_HOST } from '../../shared/constants';
import { AddStoreReviewDto, StoreReviewDto } from '../../shared/dtos/store-review.dto';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreReviewService {

  storeReviewsCount: number;

  constructor(private http: HttpClient) {
    this.setReviewsCount();
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

  fetchAllReviews() {
    return this.http.get<ResponseDto<StoreReviewDto[]>>(`${API_HOST}/api/v1/store-reviews`);
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

  countAverageRating(): Observable<number> {
    return this.fetchAllReviews().pipe(
      map(response => response.data.map(review => {
         return review.rating;
      })),
      switchMap(ratings => {
        const average = ratings.reduce((value, acc) => value + acc) / ratings.length;
        return of(Math.ceil(average));
      })
    );
  }
}
