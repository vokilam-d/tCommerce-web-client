import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { LinkedCategoryDto } from '../shared/dtos/linked-category.dto';
import { API_HOST } from '../shared/constants';

@Component({
  selector: 'linked-categories',
  templateUrl: './linked-categories.component.html',
  styleUrls: ['./linked-categories.component.scss']
})
export class LinkedCategoriesComponent implements AfterViewInit, OnChanges {

  uploadedHost = API_HOST;
  selectedCategoryIndex: number;
  @Input() categories: LinkedCategoryDto[];
  @Input() isLoading: boolean;
  @ViewChildren('itemRef') itemRefList: QueryList<ElementRef>;

  constructor( ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories']) {
      this.categories.find((category, i) => {
        if (category.isSelected) {
          this.selectedCategoryIndex = i;
          return this.selectedCategoryIndex;
        }
      });
    }
  }

  ngAfterViewInit () {
    this.itemRefList.changes.subscribe(list =>
      list.find((category, i) => this.scrollToSelectedCategory(category, i, this.selectedCategoryIndex))
    );
  }

  scrollToSelectedCategory(category:ElementRef, index:number, categoryIndex: number) {
    if (index === categoryIndex) {
      category.nativeElement.scrollIntoView(true);
    }
  }

  getCategoryImage(category) {
    if (!category.medias[0]?.variantsUrls.small) {
      return '/assets/images/no-img.png';
    } else {
      return this.uploadedHost + category.medias[0]?.variantsUrls.small;
    }
  }
}
