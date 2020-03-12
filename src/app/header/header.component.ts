import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../pages/category/category.service';
import { CategoryTreeItem } from '../shared/dtos/category-tree.dto';
import { StoreReviewService } from '../shared/services/store-review/store-review.service';
import { HeaderSidebarComponent } from './header-sidebar/header-sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: CategoryTreeItem[];
  storeReviewsCount: number;

  @ViewChild(HeaderSidebarComponent) sidebarCmp: HeaderSidebarComponent;

  constructor(private categoryService: CategoryService,
              private storeReviewService: StoreReviewService) {
  }

  ngOnInit() {
    this.fetchCategories();
    this.fetchReviewCount();
  }

  openMenu() {
    this.sidebarCmp.openMenu();
  }

  private fetchCategories() {
    this.categoryService.fetchCategoriesTree()
      .subscribe(
        response => {
          this.categories = response.data;
        },
        error => {
          console.warn(error);
        }
      );
  }

  private fetchReviewCount() {
    this.storeReviewService.fetchStoreReviewsCount()
      .subscribe(
        response => {
          this.storeReviewsCount = response.data;
        },
        error => {
          console.warn(error);
        }
      );
  }
}
