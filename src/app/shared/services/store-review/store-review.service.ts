import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../dtos/response.dto';
import { API_HOST } from '../../constants';

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
        error => {
          console.warn(error);
        }
      );
  }
}
