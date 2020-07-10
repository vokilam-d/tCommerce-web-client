export class SortingPaginatingFilterDto {
  sort: string;
  limit: number = 36;
  page: number = 1;

  [fieldName: string]: any;
}
