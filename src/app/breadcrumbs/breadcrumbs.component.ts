import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
