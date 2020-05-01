import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [{ title: '404' }];

  constructor() {
  }

  ngOnInit() {
  }
}
