import { MetaTagsDto } from './meta-tags.dto';

export class CategoryDto {
  description: string;
  id: number;
  metaTags: MetaTagsDto;
  name: string;
  parentId: number;
  slug: string;
}
