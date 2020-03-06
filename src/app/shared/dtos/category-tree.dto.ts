import { CategoryDto } from './category.dto';

export class CategoryTreeItem {
  id: CategoryDto['id'];
  name: CategoryDto['name'];
  slug: CategoryDto['slug'];
  children: CategoryTreeItem[];
}
