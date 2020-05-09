import { MediaDto } from './media.dto';
import { MetaTagsDto } from './meta-tags.dto';
import { LinkedProductDto } from './linked-product.dto';
import { LinkedBlogCategoryDto } from './linked-blog-category.dto';
import { LinkedBlogPostDto } from './linked-blog-post.dto';

export class BlogPostDto {
  category: LinkedBlogCategoryDto;
  content: string;
  linkedPosts: LinkedBlogPostDto[];
  linkedProducts: LinkedProductDto[];
  medias: MediaDto[];
  metaTags: MetaTagsDto;
  name: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
}
