import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (value === undefined) { return; }

    // if (key === 'filters') {
    //   value = (value as IGridFilter[])
    //     .filter(f => f.value)
    //     .map(f => `${f.id}:${f.value}`);
    // }

    if (Array.isArray(value)) {
      value = value.join(',');
    }

    params = params.set(key, encodeURIComponent(value.toString()));
  });

  return params;
}
