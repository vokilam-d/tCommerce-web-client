import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../services/url/url.service';

enum ESort {
  Popularity = 'popularity',
  New = 'new',
  Cheap = 'cheap',
  Expensive = 'expensive'
}
const DEFAULT_SORT: ESort = ESort.Popularity;

@Component({
  selector: 'sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent extends NgUnsubscribe implements OnInit {

  sortControl: FormControl;
  sortOptions = [
    { value: ESort.Popularity, label: 'Популярные' },
    { value: ESort.New, label: 'Сначала новые' },
    { value: ESort.Cheap, label: 'От дешёвых к дорогим' },
    { value: ESort.Expensive, label: 'От дорогих к дешёвым' }
  ];
  @Output() valueChanged = new EventEmitter();

  constructor(private urlService: UrlService) {
    super();
  }

  ngOnInit(): void {
    this.buildControl();
    this.handleValueChange();
  }

  getValue() {
    return this.sortControl.value;
  }

  private buildControl() {
    const initialValue = this.urlService.getQueryParam('sort') || ESort.Popularity;
    this.sortControl = new FormControl(initialValue);
  }

  private handleValueChange() {
    this.sortControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (value === DEFAULT_SORT) {
          this.urlService.deleteQueryParam('sort');
        } else {
          this.urlService.setQueryParam('sort', value);
        }

        this.valueChanged.emit();
      });
  }
}
