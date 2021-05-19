import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';
import { PreventScrollService } from '../../services/prevent-scroll/prevent-scroll.service';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, OnDestroy {

  isMenuOpened: boolean = false;
  @Input() categories: CategoryTreeItem[];

  constructor(
    private preventScrollService: PreventScrollService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.preventScrollService.isEnabled$.next(false);
  }

  openMenu() {
    this.isMenuOpened = true;
    this.preventScrollService.isEnabled$.next(this.isMenuOpened);
  }

  closeMenu() {
    this.isMenuOpened = false;
    this.preventScrollService.isEnabled$.next(this.isMenuOpened);
  }
}
