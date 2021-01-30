import { MediaDto } from './media.dto';

export class AddStoreReviewDto {
  email: string;
  name: string;
  rating: number;
  text: string;
  medias: MediaDto[];
  source: any;
}

export class StoreReviewDto extends AddStoreReviewDto {
  id: number;
  votesCount: number;
  hasClientVoted: boolean;
  name: string = '';
  text: string = '';
  email: string = '';
  customerId: number = null;
  rating: number = 5;
  sortOrder: number = 0;
  medias: MediaDto[] = [];
  managerComment: string = '';
  createdAt: Date = new Date();

  // custom transforms
  voteSuccess: boolean;
  voteError: string;
}
