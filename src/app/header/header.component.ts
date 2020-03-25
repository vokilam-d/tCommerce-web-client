import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../pages/category/category.service';
import { CategoryTreeItem } from '../shared/dtos/category-tree.dto';
import { StoreReviewService } from '../shared/services/store-review/store-review.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }
  get storeReviewsCount(): number { return this.storeReviewService.storeReviewsCount; }

  @Input() isCatalogFixed: boolean = false;
  @ViewChild(SidebarMenuComponent) sidebarCmp: SidebarMenuComponent;

  constructor(private categoryService: CategoryService,
              private storeReviewService: StoreReviewService) {
  }

  ngOnInit() {
  }

  openMenu() {
    this.sidebarCmp.openMenu();
  }
}
