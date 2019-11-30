import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class WebClientFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open() {
    console.log('open filters!');
  }
}
