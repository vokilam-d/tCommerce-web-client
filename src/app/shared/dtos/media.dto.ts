import { EMediaVariant } from '../enums/media-variant.enum';

type VariantsUrls = {
  [k in EMediaVariant]: string;
};

export class MediaDto {
  variantsUrls: VariantsUrls;
  altText: string;
}
