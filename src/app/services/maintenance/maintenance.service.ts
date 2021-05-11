import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { MaintenanceInfoDto } from '../../shared/dtos/maintenance-info.dto';
import { API_HOST } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private isMaintenanceInProgress: boolean = false;
  private maintenanceEndTime: Date | null = null;

  constructor(private http: HttpClient) { }

  setMaintenanceInfo(): Observable<boolean> {
    return this.http.get<ResponseDto<MaintenanceInfoDto>>(`${API_HOST}/api/v1/maintenance`)
      .pipe(
        tap(response => {
          this.isMaintenanceInProgress = response.data.isMaintenanceInProgress;
          const endTime = response.data.maintenanceEndTime;
          this.maintenanceEndTime = endTime ? new Date(endTime) : null;
        }),
        map(response => true)
      );
  }
}
