import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent implements OnInit {

  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() storeReviewsCount: number;

  constructor() { }

  ngOnInit() {
  }

}
