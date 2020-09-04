import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges, OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { LinkedCategoryDto } from '../shared/dtos/linked-category.dto';
import { API_HOST } from '../shared/constants';
import { DeviceService } from '../services/device-detector/device.service';

@Component({
  selector: 'linked-categories',
  templateUrl: './linked-categories.component.html',
  styleUrls: ['./linked-categories.component.scss']
})
export class LinkedCategoriesComponent implements AfterViewInit, OnChanges, OnInit {

  uploadedHost = API_HOST;
  selectedCategoryIndex: number;
  isDemonstrated: boolean;
  @Input() categories: LinkedCategoryDto[];
  @Input() isLoading: boolean;
  @ViewChildren('itemRef') itemRefList: QueryList<ElementRef>;

  constructor(  private deviceService: DeviceService ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories']) {
      this.setSelectedCategoryIndex();
    }
  }

  ngOnInit () {
    this.setScrollDemonstration();
  }

  ngAfterViewInit () {
    this.itemRefList.changes.subscribe(list => list.find((category, i) => this.scrollToSelectedCategory(category, i, this.selectedCategoryIndex)));
  }

  setSelectedCategoryIndex() {
    this.categories.find((category, i) => {
      if (category.isSelected) {
        this.selectedCategoryIndex = i;
        return this.selectedCategoryIndex;
      }
    });
  }

  scrollToSelectedCategory(category:ElementRef, index:number, categoryIndex: number) {
    if (index === categoryIndex) {
      category.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }

  getCategoryImage(category) {
    if (!category.medias[0]?.variantsUrls.small) {
      return '/assets/images/no-img.png';
    } else {
      return this.uploadedHost + category.medias[0]?.variantsUrls.small;
    }
  }

  setScrollDemonstration() {
    if (this.deviceService.isPlatformServer()) {
      return;
    }

   let demonstration = localStorage.getItem('isDemonstrated')
     ? JSON.parse(localStorage.getItem('isDemonstrated'))
     : false;

    if (!demonstration) {
      demonstration = true;
      this.isDemonstrated = demonstration;
      localStorage.setItem('isDemonstrated', JSON.stringify(demonstration));
    }
  }

}
