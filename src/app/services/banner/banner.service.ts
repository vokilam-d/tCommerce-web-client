import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerItemDto } from '../../shared/dtos/banner-item.dto';
import { API_HOST } from '../../shared/constants';
import { ResponseDto } from '../../shared/dtos/response.dto';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  fetchBanner(): Observable<ResponseDto<BannerItemDto[]>> {
    return this.http.get<ResponseDto<BannerItemDto[]>>(`${API_HOST}/api/v1/banner`);
  }
}
