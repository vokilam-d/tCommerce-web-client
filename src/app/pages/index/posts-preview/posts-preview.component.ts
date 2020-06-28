import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../shared/services/blog/blog.service';
import { BlogPostListItemDto } from '../../../shared/dtos/blog-post-list-item.dto';
import { API_HOST } from '../../../shared/constants';

@Component({
  selector: 'posts-preview',
  templateUrl: './posts-preview.component.html',
  styleUrls: ['./posts-preview.component.scss']
})
export class PostsPreviewComponent implements OnInit {
  posts: BlogPostListItemDto[];
  uploadedHost = API_HOST;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.blogService.getLastPosts()
      .subscribe(response => this.posts = response.data);
  }

}
