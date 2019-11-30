import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetchProduct(slug: string) {
    return this.http.get<any>(`http://localhost:3500/api/v1/products/${slug}`);
  }
}
