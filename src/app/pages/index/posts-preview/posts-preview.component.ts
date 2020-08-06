import { Component, HostListener, Input, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { BlogPostListItemDto } from '../../../shared/dtos/blog-post-list-item.dto';
import { API_HOST } from '../../../shared/constants';
import { onWindowLoad } from '../../../shared/helpers/on-window-load.function';

@Component({
  selector: 'posts-preview',
  templateUrl: './posts-preview.component.html',
  styleUrls: ['./posts-preview.component.scss']
})
export class PostsPreviewComponent implements OnInit {
  @Input() category: string;
  posts: BlogPostListItemDto[];
  uploadedHost = API_HOST;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    onWindowLoad(this, this.fetchPosts);
  }

  fetchPosts() {
    switch (this.category) {
      case 'lastWorks':
        return this.blogService.getPostsList({categoryId: 3, limit: 3})
          .subscribe(response => this.posts = response.data);

      case 'lastPosts':
        return this.blogService.getLastPosts()
          .subscribe(response => this.posts = response.data);
    }
  }
}
