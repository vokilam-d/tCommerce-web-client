import { MediaDto } from './media.dto';

export class FilterCategoryDto {
  id: number;
  medias: MediaDto[];
  name: string;
  slug: string;
}
