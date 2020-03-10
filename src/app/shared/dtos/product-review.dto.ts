import { MediaDto } from './media.dto';

export class AddProductReviewCommentDto {
  name: string = '';
  text: string = '';
  email: string = '';
}

export class ProductReviewCommentDto extends AddProductReviewCommentDto {
  id: string = '';
  customerId: number = null;
  createdAt: Date;
}

export class ProductReviewDto {
  productId: number;
  productName: string;
  productVariantId: string;
  id: number;
  isEnabled: boolean = true;
  votesCount: number;
  hasClientVoted: boolean;
  name: string = '';
  text: string = '';
  email: string = '';
  customerId: number = null;
  rating: number = 5;
  sortOrder: number = 0;
  medias: MediaDto[] = [];
  comments: ProductReviewCommentDto[] = [];
  createdAt: Date = new Date();

  // custom transforms
  isCommentFormVisible: boolean;
}
