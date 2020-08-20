import { CategoryDto } from './category.dto';
import { MediaDto } from './media.dto';

export class CategoryTreeItem {
  id: CategoryDto['id'];
  name: CategoryDto['name'];
  slug: CategoryDto['slug'];
  children: CategoryTreeItem[];
  medias: MediaDto[];

  // custom transforms
  isExpanded: boolean = false;
}
