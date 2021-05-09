import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private isMaintenanceInProgress: boolean = false;
  private maintenanceEndTime: Date = null;

  constructor(private http: HttpClient) { }

  setMaintenanceInfo(): Observable<boolean> {
    return this.http.get('')
      .pipe(
        tap(response => {
          this.isMaintenanceInProgress = response.isMaintenanceInProgress;
          this.maintenanceEndTime = new Date(response.maintenanceEndTime);
        }),
        map(response => true)
      );
  }
}
