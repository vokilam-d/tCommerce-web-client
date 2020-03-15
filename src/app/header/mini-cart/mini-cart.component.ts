import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openCart() {
    console.log('openCart');
  }
}
