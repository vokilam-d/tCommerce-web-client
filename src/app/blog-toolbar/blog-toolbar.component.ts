import { Component, OnInit } from '@angular/core';
import { BlogCategoryListItemDto } from '../shared/dtos/blog-category-list-item.dto';
import { BlogPostListItemDto } from '../shared/dtos/blog-post-list-item.dto';
import { BlogService } from '../shared/services/blog/blog.service';

enum Content {
  Categories,
  LastPosts
}

@Component({
  selector: 'blog-toolbar',
  templateUrl: './blog-toolbar.component.html',
  styleUrls: ['./blog-toolbar.component.scss']
})
export class BlogToolbarComponent implements OnInit {

  categories: BlogCategoryListItemDto[];
  lastPosts: BlogPostListItemDto[];

  content = Content;
  isVisible: { [c in Content]: boolean } = {
    [Content.Categories]: false,
    [Content.LastPosts]: false
  };

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.setCategories();
    this.setLastPosts();
  }

  private setCategories() {
    this.blogService.getCategories()
      .pipe()
      .subscribe(
        response => {
          this.categories = response.data;
        }
      );
  }

  private setLastPosts() {
    this.blogService.getLastPosts()
      .pipe()
      .subscribe(
        response => {
          this.lastPosts = response.data;
        }
      );
  }

  toggleContent(content: Content) {
    this.isVisible[content] = !this.isVisible[content];
  }
}
