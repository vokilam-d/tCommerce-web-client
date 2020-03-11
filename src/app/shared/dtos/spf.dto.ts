export class SortingPaginatingFilterDto {
  sort: string;
  limit: number = 20;
  page: number = 1;

  [fieldName: string]: any;
}
