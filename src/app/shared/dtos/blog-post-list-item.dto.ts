import { LinkedBlogCategoryDto } from './linked-blog-category.dto';
import { MediaDto } from './media.dto';

export class BlogPostListItemDto {
  category: LinkedBlogCategoryDto;
  name: string;
  publishedAt: Date;
  updatedAt: Date;
  shortContent: string;
  slug: string;
  featuredMedia: MediaDto;
}
