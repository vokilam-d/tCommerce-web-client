import { LinkedBlogCategoryDto } from './linked-blog-category.dto';

export class BlogPostListItemDto {
  category: LinkedBlogCategoryDto;
  name: string;
  publishedAt: Date;
  shortContent: string;
  slug: string;
}
