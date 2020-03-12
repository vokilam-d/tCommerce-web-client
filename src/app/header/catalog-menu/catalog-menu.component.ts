import { Component, Input, OnInit } from '@angular/core';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';

@Component({
  selector: 'catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent implements OnInit {

  @Input() isForTouch: boolean = false;
  @Input() categories: CategoryTreeItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
