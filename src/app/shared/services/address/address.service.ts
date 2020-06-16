import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from '../../constants';
import { StreetDto } from '../../dtos/street.dto';
import { SettlementDto } from '../../dtos/settlement.dto';
import { ResponseDto } from '../../dtos/response.dto';
import { WarehouseDto } from '../../dtos/warehouse.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {
  }

  fetchSettlements(query: string) {
    return this.http.get<ResponseDto<SettlementDto[]>>(`${API_HOST}/api/v1/settlements`, { params: { name: query } });
  }

  fetchWarehouses(settlementId: string, query: string) {
    const params = {
      settlementId,
      filter: query
    };

    return this.http.get<ResponseDto<WarehouseDto[]>>(`${API_HOST}/api/v1/warehouses`, { params });
  }

  fetchStreets(settlementId: string, query: string) {
    const params = {
      settlementId,
      filter: query
    };

    return this.http.get<ResponseDto<StreetDto[]>>(`${API_HOST}/api/v1/streets`, { params });
  }
}
