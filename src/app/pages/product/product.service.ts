import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { ProductDto } from '../../shared/dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetchProduct(slug: string) {
    return this.http.get<ResponseDto<ProductDto>>(`http://localhost:3500/api/v1/products/${slug}`);
  }
}
