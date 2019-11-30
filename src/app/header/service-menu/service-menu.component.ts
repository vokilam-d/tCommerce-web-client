import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class WebClientServiceMenuComponent implements OnInit {

  @Input() vertical: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
