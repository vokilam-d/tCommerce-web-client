import { 
  ChangeDetectionStrategy,
  Component, 
  Input, 
  OnInit,
  OnChanges, 
  Output,
  EventEmitter} from '@angular/core';
import { UrlService } from 'src/app/services/url/url.service';
import { FilterDto, FilterValueDto} from 'src/app/shared/dtos/filter.dto';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent implements OnInit, OnChanges  {

  selectedFiltersInBar = [];

  get activeFilters(): FilterDto[] {
    const active: FilterDto[] = [];

    this.filters?.forEach(filter => {
      switch (filter.type) {
        case 'checkbox':
          const selectedValues = filter.values.filter(v => v.isSelected);
          if (selectedValues.length) {
            active.push({ ...filter, values: selectedValues });
          }
          break;
        case 'range':
          if (
            filter.rangeValues.range.min !== filter.rangeValues.selected.min
            || filter.rangeValues.range.max !== filter.rangeValues.selected.max
          ) {
            active.push(filter);
          }
          break;
      }
    });

    return active;
  }
  
  @Input() filters: FilterDto[];
  @Input() filteredCount: number;
  @Output() refresh = new EventEmitter();
    
  constructor (private urlService: UrlService) {
  }
  
  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.filters) {
      this.setSelectedFilters();
    }
  }

  unselect(activeFilter: FilterDto, value?: FilterValueDto){
    switch (activeFilter.type) {
      case 'checkbox':
        value.isSelected = false;
        this.updateQuery(activeFilter, value);
        break;
      case 'range':
        activeFilter.rangeValues.selected.min = activeFilter.rangeValues.range.min;
        activeFilter.rangeValues.selected.max = activeFilter.rangeValues.range.max;
        this.urlService.deleteQueryParam(activeFilter.id);
        break;
    }
    this.refresh.emit();
    this.setSelectedFilters();
  }

  unselectAll() {
    let isChanged: boolean = false;

    this.filters.forEach(filter => {
      switch (filter.type) {
        case 'checkbox':
          filter.values.forEach(value => {
            if (value.isSelected) {
              value.isSelected = false;
              this.urlService.deleteQueryParam(filter.id);
              isChanged = true;
            }
          });
          break;
        case 'range':
          filter.rangeValues.selected.min = filter.rangeValues.range.min;
          filter.rangeValues.selected.max = filter.rangeValues.range.max;
          this.urlService.deleteQueryParam(filter.id);
          isChanged = true;
          break;
      }
    });

    if (isChanged) {
      this.refresh.emit();
    }
  }

  private setSelectedFilters(): any {
    const selectedFiltersInBar: FilterDto[] = [];
  
      if (this.filters) {
        this.filters.map(filter => {
          if (filter.type === 'range') {
            if (filter.rangeValues.range.min !== filter.rangeValues.selected.min 
              || filter.rangeValues.range.max !== filter.rangeValues.selected.max ){
              selectedFiltersInBar.push(filter);
            }
          } else {
            const selectedValues =  filter.values.filter(i => i.isSelected);
            if (selectedValues.length) {
              selectedFiltersInBar.push({ ...filter, values: selectedValues });
              } 
          }
        })
      }
    this.selectedFiltersInBar = selectedFiltersInBar;
    return selectedFiltersInBar;
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

