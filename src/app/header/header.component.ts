import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../pages/category/category.service';
import { CategoryTreeItem } from '../shared/dtos/category-tree.dto';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { StoreReviewService } from '../services/store-review/store-review.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isFixed: boolean;
  toolbarPosition: number;

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }
  get storeReviewsCount(): number { return this.storeReviewService.storeReviewsCount; }

  @Input() isSidebarCatalog: boolean = false;
  @ViewChild(SidebarMenuComponent) sidebarCmp: SidebarMenuComponent;
  @ViewChild('toolbarRef') toolbarRef: ElementRef;

  constructor(private categoryService: CategoryService,
              private storeReviewService: StoreReviewService

  ) { }

  ngOnInit() { }

  openMenu() {
    this.sidebarCmp.openMenu();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isFixed = window.pageYOffset > this.toolbarPosition;

    if (!this.isFixed) {
      const toolbarEl = this.toolbarRef.nativeElement;
      this.toolbarPosition = toolbarEl.getBoundingClientRect().top + document.documentElement.scrollTop;
    }
  }
}
