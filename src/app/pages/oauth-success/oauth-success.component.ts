import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device-detector/device.service';

@Component({
  selector: 'oauth-success',
  templateUrl: './oauth-success.component.html',
  styleUrls: ['./oauth-success.component.scss']
})
export class OauthSuccessComponent implements OnInit {

  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    if (this.deviceService.isPlatformBrowser()) {
      window.close();
    }
  }

}
