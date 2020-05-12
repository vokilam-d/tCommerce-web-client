import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';
import { HeadService } from '../../shared/services/head/head.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  constructor(private categoryService: CategoryService,
              private headService: HeadService) {
  }

  ngOnInit() {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({
      title: 'Клондайк для творчества! Интернет-магазин художественных товаров',
      description: 'В магазине Клондайк можно купить товары для золочения (поталь, мордан, шеллак), художественные товары (акриловые краски, масляные краски, художественные кисти) и многое другое',
      keywords: ''
    });
  }
}
