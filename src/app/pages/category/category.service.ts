import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { CategoryDto } from '../../shared/dtos/category.dto';
import { CategoryTreeItem } from '../../shared/dtos/category-tree.dto';
import { API_HOST } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: CategoryTreeItem[];

  constructor(private http: HttpClient) {
    this.setCategories();
  }

  setCategories() {
    this.http.get<ResponseDto<CategoryTreeItem[]>>(`${API_HOST}/api/v1/categories/tree`)
      .subscribe(
        response => {
          this.categories = response.data;
        },
        err => {
          console.warn(`${new Date().toISOString()} - Could not set categories`, err.message);
        }
      );
  }

  fetchCategory(slug: string) {
    return this.http.get<ResponseDto<CategoryDto>>(`${API_HOST}/api/v1/categories/${slug}`);
  }
}
