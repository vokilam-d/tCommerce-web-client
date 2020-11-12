import { 
  ChangeDetectionStrategy,
  ChangeDetectorRef, 
  Component, 
  Input, 
  OnInit,
  OnChanges, 
  Output,
  EventEmitter,
  SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';
import { SEARCH_QUERY_PARAM } from 'src/app/shared/constants';
import { FilterDto, FilterValueDto, Range } from 'src/app/shared/dtos/filter.dto';
import { ISelectedFilter } from '../filter/selected-filter.interface';


@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent implements OnInit, OnChanges  {

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
  selectedFiltersInBar = [];
  
  constructor(private route: ActivatedRoute,
    private urlService: UrlService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.filters){
      this.getSelectedFilters()
    }
  }

   private getSelectedFilters(): any {
    const selectedFiltersInBar: FilterDto[] = []
  
      if(this.filters){
        this.filters.map(filter => {
          if(filter.type === 'range'){
            if(filter.rangeValues.range.min !== filter.rangeValues.selected.min 
              || filter.rangeValues.range.max !== filter.rangeValues.selected.max ){
                selectedFiltersInBar.push(filter)
              }
            } else {
              const selectedValues =  filter.values.filter(i => i.isSelected)
              if(selectedValues.length){
              selectedFiltersInBar.push({ ...filter, values: selectedValues })
              } 
            }
        })
      }
      this.selectedFiltersInBar = selectedFiltersInBar
      return selectedFiltersInBar
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
    this.cdr.markForCheck();
    this.getSelectedFilters();
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

