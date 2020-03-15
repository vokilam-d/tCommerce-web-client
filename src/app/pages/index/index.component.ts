import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

}
