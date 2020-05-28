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
import { FilterDto, FilterValueDto } from '../../shared/dtos/filter.dto';
import { UrlService } from '../../shared/services/url/url.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  get activeFilters(): FilterDto[] {
    return this.filters
      ?.map(filter => ({ ...filter, values: filter.values.filter(value => value.isSelected) }))
      .filter(filter => filter.values.length);
  }

  isOpened: boolean = true;
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
      return this.transformFilters();
    } else {
      return this.getFiltersByQueryParams();
    }
  }

  openFilters() {
    this.isOpened = true;
    this.cdr.markForCheck();
  }

  closeFilters() {
    this.isOpened = false;
    this.cdr.markForCheck();
  }

  unselect(filter: FilterDto, value: FilterValueDto) {
    value.isSelected = false;
    this.valueChanged.emit();
    this.cdr.markForCheck();
  }

  unselectAll() {
    let isChanged: boolean = false;

    this.filters.forEach(filter => {
      filter.values.forEach(value => {
        if (value.isSelected) {
          value.isSelected = false;
          this.urlService.deleteQueryParam(filter.id);
          isChanged = true;
        }
      });
    });

    if (isChanged) {
      this.valueChanged.emit();
    }
  }

  private getFiltersByQueryParams() {
    const selectedFilters: ISelectedFilter[] = [];

    Object.keys(this.route.snapshot.queryParams).forEach(key => {
      selectedFilters.push({ id: key, valueId: this.route.snapshot.queryParams[key] });
    });

    return selectedFilters;
  }

  private transformFilters(): ISelectedFilter[] {
    const selectedFilters: ISelectedFilter[] = [];

    this.activeFilters.forEach(filterDto => {
      filterDto.values.forEach(value => {
        selectedFilters.push({ id: filterDto.id, valueId: value.id });
      });
    });

    return selectedFilters;
  }

  checkboxToggle() {
    this.valueChanged.emit();
  }
}
