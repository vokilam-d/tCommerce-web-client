import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseDto } from '../../dtos/response.dto';
import { BlogCategoryListItemDto } from '../../dtos/blog-category-list-item.dto';
import { HttpClient } from '@angular/common/http';
import { BlogPostListItemDto } from '../../dtos/blog-post-list-item.dto';
import { API_HOST } from '../../constants';
import { tap } from 'rxjs/operators';
import { BlogCategoryDto } from '../../dtos/blog-category.dto';
import { BlogPostDto } from '../../dtos/blog-post.dto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private categories: BlogCategoryListItemDto[];
  private lastPosts: BlogPostListItemDto[];

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<ResponseDto<BlogCategoryListItemDto[]>> {
    if (this.categories) {
      return of({ data: this.categories });
    }

    return this.http
      .get<ResponseDto<BlogCategoryListItemDto[]>>(`${API_HOST}/api/v1/blog/categories`)
      .pipe( tap(response => this.categories = response.data) );
  }

  getCategory(slug: string) {
    return this.http.get<ResponseDto<BlogCategoryDto>>(`${API_HOST}/api/v1/blog/categories/${slug}`);
  }

  getPost(slug: string) {
    return this.http.get<ResponseDto<BlogPostDto>>(`${API_HOST}/api/v1/blog/posts/${slug}`);
  }

  getLastPosts(): Observable<ResponseDto<BlogPostListItemDto[]>> {
    if (this.lastPosts) {
      return of({ data: this.lastPosts });
    }

    return this.getPostsList({ lastPosts: 'true', limit: '5' })
      .pipe( tap(response => this.lastPosts = response.data) );
  }

  getPostsList(params?: any): Observable<ResponseDto<BlogPostListItemDto[]>> {
    return this.http
      .get<ResponseDto<BlogPostListItemDto[]>>(
        `${API_HOST}/api/v1/blog/posts`,
        { params: { ...(params ? params : {}) } }
      );
  }
}
