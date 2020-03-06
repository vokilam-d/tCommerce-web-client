import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { CategoryDto } from '../../shared/dtos/category.dto';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  fetchCategoriesTree(slug: string) {
    return this.http.get<ResponseDto<CategoryTreeItem[]>>(`http://localhost:3500/api/v1/categories/${slug}`);
  }

  fetchCategory(slug: string) {
    return this.http.get<ResponseDto<CategoryDto>>(`http://localhost:3500/api/v1/categories/${slug}`);
  }

  fetchCategoryItems(id: string) {
    return this.http.get<ResponseDto<any[]>>(`http://localhost:3500/api/v1/categories/${id}/items`);
  }
}
