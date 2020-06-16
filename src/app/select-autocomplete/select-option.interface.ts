export interface ISelectOption<T = any> {
  data: T;
  view?: string;
  isSelected?: boolean;
}
