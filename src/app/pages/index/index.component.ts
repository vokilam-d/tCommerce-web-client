import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';
import { HeadService } from '../../services/head/head.service';
import { UPLOADED_HOST } from '../../shared/constants';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  uploadedHost = UPLOADED_HOST;

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  constructor(private categoryService: CategoryService,
              private headService: HeadService) {
  }

  ngOnInit() {
    this.setMeta();
  }

  getCategoryImage(category: CategoryTreeItem): string {
    if (!category.medias[0]?.variantsUrls.small) {
      return '/assets/images/no-img.jpg';
    } else {
      return this.uploadedHost + category.medias[0]?.variantsUrls.small;
    }
  }

  private setMeta() {
    this.headService.setMeta({
      title: 'Клондайк для творчества! Интернет-магазин художественных товаров',
      description: 'В магазине Клондайк можно купить товары для золочения (поталь, мордан, шеллак), художественные товары (акриловые краски, масляные краски, художественные кисти) и многое другое',
      keywords: ''
    });
  }
}
