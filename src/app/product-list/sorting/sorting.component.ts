import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../services/url/url.service';
import { ESort } from '../../shared/enums/sort.enum';

@Component({
  selector: 'sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent extends NgUnsubscribe implements OnInit {

  sortControl: FormControl;
  sortEnum = ESort;

  @Input() sortOptions: ESort[];
  @Input() defaultOption: ESort;
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
    const initialValue = this.urlService.getQueryParam('sort') || this.defaultOption;
    this.sortControl = new FormControl(initialValue);
  }

  private handleValueChange() {
    this.sortControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (value === this.defaultOption) {
          this.urlService.deleteQueryParam('sort');
        } else {
          this.urlService.setQueryParam('sort', value);
        }

        this.valueChanged.emit();
      });
  }
}
