import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AggregatedProductsTableDto } from '../../../shared/dtos/aggregated-products-table.dto';
import { ResponseDto } from '../../../shared/dtos/response.dto';
import { API_HOST } from '../../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {

  constructor(private http: HttpClient) {
  }

  fetchAggregatedProductsTables(productId: number): Observable<ResponseDto<AggregatedProductsTableDto[]>> {
    return this.http.get<ResponseDto<AggregatedProductsTableDto[]>>(`${API_HOST}/api/v1/aggregators/${productId}`);
  }
}
