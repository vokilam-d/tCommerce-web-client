import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private location: Location) { }

  getQueryParam(param: string): string | null {
    const [ pathname, search ] = this.location.path(false).split('?');

    const params = new URLSearchParams(search);
    return params.get(param);
  }

  setQueryParam(param: string, value: any) {
    const [ pathname, search ] = this.location.path(false).split('?');

    const params = new URLSearchParams(search);
    params.set(param, value);

    this.location.go(pathname, params.toString());
  }

  deleteQueryParam(param: string) {
    const [ pathname, search ] = this.location.path(false).split('?');

    const params = new URLSearchParams(search);
    params.delete(param);

    this.location.go(pathname, params.toString());
  }
}
