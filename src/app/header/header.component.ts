import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../pages/category/category.service';
import { CategoryTreeItem } from '../shared/dtos/category-tree.dto';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  @Input() isCatalogFixed: boolean = false;
  @ViewChild(SidebarMenuComponent) sidebarCmp: SidebarMenuComponent;
  @ViewChild('toolbarRef') toolbarRef: ElementRef;
  @ViewChild('headerRef') headerRef: ElementRef;

  isFixed: boolean;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isFixed = window.pageYOffset > this.toolbarRef.nativeElement.offsetTop;
  }

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  openMenu() {
    this.sidebarCmp.openMenu();
  }
}
