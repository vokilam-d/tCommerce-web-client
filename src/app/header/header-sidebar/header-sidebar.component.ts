import { Component, Input, OnInit } from '@angular/core';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';

@Component({
  selector: 'header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent implements OnInit {

  isMenuOpened: boolean = false;
  @Input() categories: CategoryTreeItem[];
  @Input() storeReviewsCount: number;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.isMenuOpened = true;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }

  navigateToAccount() {
    console.log('navigateToAccount!');
  }
}
