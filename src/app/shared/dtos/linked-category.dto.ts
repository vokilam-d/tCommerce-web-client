import { MediaDto } from './media.dto';

export class LinkedCategoryDto {
  id: number;
  medias: MediaDto[];
  name: string;
  slug: string;
}
