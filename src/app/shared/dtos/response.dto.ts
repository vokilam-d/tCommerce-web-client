export class ResponseDto<T> {
  data: T;
  page?: number;
  pagesTotal?: number;
  itemsTotal?: number;
  itemsFiltered?: number;
}
