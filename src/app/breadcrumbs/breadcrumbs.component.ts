import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class WebClientBreadcrumbsComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
