import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from './breadcrumbs.interface';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumbs: IBreadcrumb[];

  constructor() { }

  ngOnInit() {
  }

}
