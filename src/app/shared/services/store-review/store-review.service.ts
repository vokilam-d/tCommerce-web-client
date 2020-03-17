import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../dtos/response.dto';

@Injectable({
  providedIn: 'root'
})
export class StoreReviewService {

  constructor(private http: HttpClient) { }

  fetchStoreReviewsCount() {
    return this.http.get<ResponseDto<number>>('http://localhost:3500/api/v1/store-reviews/count')
  }
}
