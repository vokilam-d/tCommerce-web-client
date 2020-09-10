import { AutocompleteItemType } from '../enums/autocomplete-item-type.enum';

export class AutocompleteItemDto {
  slug: string;
  name: string;
  type: AutocompleteItemType;
  mediaUrl: string;
}
