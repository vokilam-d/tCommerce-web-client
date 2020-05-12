import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { HeadService } from '../../shared/services/head/head.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [{ title: '404' }];

  constructor(private headService: HeadService) {
  }

  ngOnInit() {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({
      title: 'Страница не найдена',
      description: 'Страница не найдена'
    });
  }
}
