import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance/maintenance.service';

@Component({
  selector: 'oops-page',
  templateUrl: './oops-page.component.html',
  styleUrls: ['./oops-page.component.scss']
})
export class OopsPageComponent implements OnInit {

  // get maintenanceEndTime(): Date { return this.maintenanceService.maintenanceEndTime; }
  maintenanceEndTime: Date = new Date();

  constructor(
    private maintenanceService: MaintenanceService
  ) { }

  ngOnInit(): void {
  }

}
