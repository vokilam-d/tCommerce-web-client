import { Component, Input, OnInit } from '@angular/core';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  isMenuOpened: boolean = false;
  @Input() categories: CategoryTreeItem[];

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.isMenuOpened = true;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }
}
