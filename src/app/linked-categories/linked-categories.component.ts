import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
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
    this.itemRefList.changes.subscribe(list => list.forEach((category, i) => {
      if (i === this.selectedCategoryIndex) {
        this.scrollToSelectedCategory(category);
      }
    }));
  }

  setSelectedCategoryIndex() {
    this.selectedCategoryIndex = this.categories.findIndex(category => category.isSelected);
  }

  scrollToSelectedCategory(category:ElementRef) {
    category.nativeElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
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

    let clearDate = JSON.parse(localStorage.getItem('scrollDemonstrationClearDate'));
    let currentDate = Date.now();

    if (currentDate >= clearDate) {
      this.isDemonstrated = true;
      localStorage.setItem('scrollDemonstrationClearDate', JSON.stringify(Date.now() + (1000 * 60 * 60 * 24 * 3)));
    }
  }

}
