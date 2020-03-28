import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(window.history.state);
  }

}
