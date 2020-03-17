import { Component, OnInit } from '@angular/core';
import { IProductListFilter } from '../product-list-filter.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  isOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getValue(): IProductListFilter[] {
    return [];
  }

  openFilters() {
    this.isOpened = true;
  }

  closeFilters() {
    this.isOpened = false;
  }

  unselect() {
    console.log('unselect');
  }
}
