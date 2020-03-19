export class SortingPaginatingFilterDto {
  sort: string;
  limit: number = 30;
  page: number = 1;

  [fieldName: string]: any;
}
