export interface IFilter {
  id: string;
  label: string;
  values: {
    id: string;
    label: string;
    productsCount: number;
    isDisabled: boolean;

    // custom transforms
    isSelected?: boolean;
  }[];
}
