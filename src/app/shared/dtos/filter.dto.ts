export class FilterValueDto {
  id: string;
  label: string;
  productsCount: number;
  isDisabled: boolean;
  isSelected: boolean;
}

export class Range {
  min: number;
  max: number;
}

export class FilterRangeValuesDto {
  range: Range;
  selected: Range;
}

export class FilterDto {
  id: string;
  label: string;
  type: 'checkbox' | 'range';
  isDisabled: boolean;
  values: FilterValueDto[];
  rangeValues?: FilterRangeValuesDto;
}
