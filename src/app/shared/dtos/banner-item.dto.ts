import { ProductLabelTypeEnum } from '../enums/product-label-type.enum';
import { MediaDto } from './media.dto';
import { EBannerItemType } from '../enums/banner-item-type.enum';


export class BannerItemDto {
  id: number;
  type: EBannerItemType;
  media: MediaDto;
  slug: string;
  price?: number;
  oldPrice?: number;
  discountValue?: number;
  label?: {
    type: ProductLabelTypeEnum;
    text: string;
  };
}
