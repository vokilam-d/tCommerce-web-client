import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';
import { HeadService } from '../../services/head/head.service';
import { UPLOADED_HOST } from '../../shared/constants';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  uploadedHost = UPLOADED_HOST;

  get categories(): CategoryTreeItem[] { return this.categoryService.categories; }

  constructor(
    private categoryService: CategoryService,
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

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
    const title = 'index.meta_title';
    const description = 'index.meta_description';
    this.languageService.getTranslation([title, description]).subscribe(texts => {
      this.headService.setMeta({
        title: texts[title],
        description: texts[description],
        keywords: ''
      });
    });
  }
}
