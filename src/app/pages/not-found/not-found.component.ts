import { Component, Inject, OnInit, Optional } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { HeadService } from '../../services/head/head.service';
import { Response } from 'express';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { DeviceService } from '../../services/device-detector/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [{ title: '404' }];

  constructor(
    @Optional() @Inject(RESPONSE) private res: Response,
    private headService: HeadService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    const autoReloadField = 'isAutoReload';
    if (this.deviceService.isPlatformBrowser() && !window.history.state[autoReloadField]) {
      this.router.navigate(this.route.snapshot.url, {
        state: { [autoReloadField]: true },
        preserveFragment: true,
        queryParamsHandling: 'preserve'
      }); // workaround for route matching before router reset on APP_INIT
      return;
    }

    this.setMeta();
    if (this.deviceService.isPlatformServer()) {
      this.res.status(404);
    }
  }

  private setMeta() {
    this.languageService.getTranslation('not_found_page.not_found_page').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
