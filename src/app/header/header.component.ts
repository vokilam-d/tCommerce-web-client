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

  isFixed: boolean;
  isSearchBarInFocus: boolean;
  toolbarPosition: number;

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  @Input() isSidebarCatalog: boolean = false;
  @ViewChild(SidebarMenuComponent) sidebarCmp: SidebarMenuComponent;
  @ViewChild('toolbarRef',  { read: ElementRef }) toolbarRef: ElementRef;

  constructor(private categoryService: CategoryService) { }

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

  public setIsSearchBarInFocus(isSearchBarInFocus: boolean) {
    this.isSearchBarInFocus = isSearchBarInFocus;
  }
}
