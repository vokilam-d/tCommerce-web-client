import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../../shared/services/blog/blog.service';
import { BlogPostListItemDto } from '../../../shared/dtos/blog-post-list-item.dto';
import { API_HOST } from '../../../shared/constants';

@Component({
  selector: 'posts-preview',
  templateUrl: './posts-preview.component.html',
  styleUrls: ['./posts-preview.component.scss']
})
export class PostsPreviewComponent implements OnInit {
  uploadedHost = API_HOST;

  @Input() category: string;
  posts: BlogPostListItemDto[];
  title: string;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  // fetchPosts() {
  //   this.blogService.getLastPosts()
  //     .subscribe(response => this.posts = response.data);
  // }

  //to fetch different categories
  fetchPosts() {

    switch (this.category) {
      case 'lastWorks': {
        return this.blogService.getPostsList({categoryId: 3, limit: 3})
          .subscribe(response => {
            this.posts = response.data;
            this.title = this.posts[0].category.name;
          });
      }
      case 'lastPosts': {
        return this.blogService.getPostsList({categoryId: 5, limit: 3})
          .subscribe(response => {
            this.posts = response.data;
            this.title = this.posts[0].category.name;
          });
      }
    }
  }

}
