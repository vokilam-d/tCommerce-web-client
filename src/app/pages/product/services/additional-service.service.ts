import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../../shared/dtos/response.dto';
import { API_HOST } from '../../../shared/constants';
import { Injectable } from '@angular/core';
import { AdditionalServiceDto } from '../../../shared/dtos/additional-service.dto';
import { toHttpParams } from '../../../shared/helpers/to-http-params.function';


@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceService {
  constructor(private http: HttpClient) {
  }

  fetchAdditionalServices(ids: number[]): Observable<ResponseDto<AdditionalServiceDto[]>> {
    const params = toHttpParams({ ids });

    return this.http.get<ResponseDto<AdditionalServiceDto[]>>(`${API_HOST}/api/v1/additional-services`, { params });
  }
}
