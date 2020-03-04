import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  @Input() item: any;
  @Output('buy') buyEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  buy() {
    this.buyEmitter.emit();
  }

  addToWishlist() {
    console.log('add to wishlist!', this.item);
  }
}
