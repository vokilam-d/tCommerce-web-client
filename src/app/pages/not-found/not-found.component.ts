import { Component, Inject, OnInit, Optional } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { HeadService } from '../../shared/services/head/head.service';
import { Response } from 'express';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { DeviceService } from '../../shared/services/device-detector/device.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [{ title: '404' }];

  constructor(private headService: HeadService,
              private deviceService: DeviceService,
              @Optional() @Inject(RESPONSE) private res: Response) {
  }

  ngOnInit() {
    this.setMeta();
    if (this.deviceService.isPlatformServer()) {
      this.res.status(404);
    }
  }

  private setMeta() {
    this.headService.setMeta({
      title: 'Страница не найдена',
      description: 'Страница не найдена'
    });
  }
}
