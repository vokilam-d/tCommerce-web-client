import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ISelectedFilter } from './selected-filter.interface';
import { ActivatedRoute } from '@angular/router';
import { FilterDto, FilterValueDto, Range } from '../../shared/dtos/filter.dto';
import { UrlService } from '../../services/url/url.service';
import { SEARCH_QUERY_PARAM } from '../../shared/constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Input() filters: FilterDto[];
  @Input() filteredCount: number;
  @Output() valueChanged = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private urlService: UrlService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  getValue(): ISelectedFilter[] {
    if (this.filters) {
      return this.buildSelectedFilters();
    } else {
      return this.getFiltersByQueryParams();
    }
  }

  private getFiltersByQueryParams() {
    const selectedFilters: ISelectedFilter[] = [];

    Object.keys(this.route.snapshot.queryParams).forEach(key => {
      if (key === SEARCH_QUERY_PARAM) { return; }

      selectedFilters.push({ id: key, valueId: this.route.snapshot.queryParams[key] });
    });

    return selectedFilters;
  }

  private buildSelectedFilters(): ISelectedFilter[] {
    const selectedFilters: ISelectedFilter[] = [];

    this.filters?.forEach(filter => {
      switch (filter.type) {
        case 'checkbox':
          filter.values.forEach(value => {
            if (!value.isSelected) { return; }

            selectedFilters.push({ id: filter.id, valueId: value.id });
          });
          break;
        case 'range':
          if (
            filter.rangeValues.range.min === filter.rangeValues.selected.min
            && filter.rangeValues.range.max === filter.rangeValues.selected.max
          ) { return; }

          selectedFilters.push({ id: filter.id, valueId: `${filter.rangeValues.selected.min}-${filter.rangeValues.selected.max}` });
          break;
      }
    });

    return selectedFilters;
  }

  checkboxToggle(filter: FilterDto, value: FilterValueDto) {
    this.updateQuery(filter, value);
    this.valueChanged.emit();
  }

  rangeValueChanged(filter: FilterDto, range: Range) {
    filter.rangeValues.selected = range;
    this.urlService.setQueryParam(filter.id, `${range.min}-${range.max}`);
    this.valueChanged.emit();
  }

  private updateQuery(filter: FilterDto, value: FilterValueDto) {
    const valuesArr = this.urlService.getQueryParam(filter.id)?.split(',') || [];

    if (value.isSelected) {
      valuesArr.push(value.id);
    } else {
      const idx = valuesArr.indexOf(value.id);
      if (idx !== -1) { valuesArr.splice(idx, 1); }
    }

    if (valuesArr.length) {
      const newValue = valuesArr.join(',');
      this.urlService.setQueryParam(filter.id, newValue);
    } else {
      this.urlService.deleteQueryParam(filter.id);
    }
  }
}
