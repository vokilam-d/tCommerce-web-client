import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CategoryService } from '../pages/category/category.service';
import { CategoryTreeItem } from '../shared/dtos/category-tree.dto';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ToolbarService } from '../services/toolbar/toolbar.service';
import { DeviceService } from '../services/device-detector/device.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isSearchBarInFocus: boolean;

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  @Input() isSidebarCatalog: boolean = false;
  @ViewChild(SidebarMenuComponent) sidebarCmp: SidebarMenuComponent;
  @ViewChild('toolbarRef',  { read: ElementRef }) toolbarRef: ElementRef;

  constructor(
    private categoryService: CategoryService,
    private deviceService: DeviceService,
    private renderer: Renderer2,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.setToolbarParentHeight();
  }

  openMenu() {
    this.sidebarCmp.openMenu();
  }

  setToolbarParentHeight() {
    if (this.deviceService.isPlatformServer()) { return; }

    const toolbarEl = this.toolbarRef.nativeElement as HTMLElement;
    const toolbarHeight = toolbarEl.getBoundingClientRect().height;
    this.toolbarService.toolbarElHeight = toolbarHeight;
    this.renderer.setStyle(toolbarEl.parentElement, 'height', `${toolbarHeight}px`)
  }

  public setIsSearchBarInFocus(isSearchBarInFocus: boolean) {
    this.isSearchBarInFocus = isSearchBarInFocus;
  }
}
