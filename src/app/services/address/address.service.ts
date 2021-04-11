import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from '../../shared/constants';
import { StreetDto } from '../../shared/dtos/street.dto';
import { SettlementDto } from '../../shared/dtos/settlement.dto';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { WarehouseDto } from '../../shared/dtos/warehouse.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {
  }

  fetchSettlements(query: string) {
    const params = {
      name: query,
      limit: '60'
    };

    return this.http.get<ResponseDto<SettlementDto[]>>(`${API_HOST}/api/v1/settlements`, { params });
  }

  fetchWarehouses(settlementId: string, query: string) {
    const params = {
      settlementId,
      filter: query,
      limit: '60'
    };

    return this.http.get<ResponseDto<WarehouseDto[]>>(`${API_HOST}/api/v1/warehouses`, { params });
  }

  fetchStreets(settlementId: string, query: string) {
    const params = {
      settlementId,
      filter: query,
      limit: '60'
    };

    return this.http.get<ResponseDto<StreetDto[]>>(`${API_HOST}/api/v1/streets`, { params });
  }
}
