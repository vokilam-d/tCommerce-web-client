import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { AddProductReviewDto, ProductReviewDto } from '../../../shared/dtos/product-review.dto';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { AddReviewComponent, IAddReviewFormValue } from '../../../add-review/add-review.component';
import { finalize } from 'rxjs/operators';
import { NotyService } from '../../../noty/noty.service';
import { LanguageService } from '../../../services/language/language.service';
import { ProductReviewService } from '../services/product-review.service';

@Component({
  selector: 'product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  mediaUploadUrl: string = this.productReviewService.mediaUploadUrl;
  isLoading: boolean = false;

  @Input() product: ProductDto;
  @Input() reviews: ProductReviewDto[];
  @ViewChild(AddReviewComponent) addReviewCmp: AddReviewComponent;

  constructor(
    private productReviewService: ProductReviewService,
    private notyService: NotyService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
  }

  vote(review: ProductReviewDto) {
    this.productReviewService.vote(review.id)
      .subscribe(
        _ => {
          review.voteSuccess = true;
          review.votesCount += 1;
        },
        error => {
          review.voteError = error.error.message;
        }
      );
  }

  downvote(review: ProductReviewDto) {
    this.productReviewService.downvote(review.id)
      .subscribe(
        _ => {
          review.voteSuccess = true;
          if (review.votesCount > 0) {
            review.votesCount -= 1;
          }
        },
        error => {
          review.voteError = error.error.message;
        }
      );
  }

  onAddComment(review: ProductReviewDto, formValue: any) {
    this.productReviewService.addComment(review.id, formValue)
      .subscribe(
        response => {
          review.comments = response.data.comments;
        },
        error => this.notyService.error(error.error?.message || DEFAULT_ERROR_TEXT)
      );
  }

  onReviewAdd(formValue: IAddReviewFormValue) {
    const reviewDto = new AddProductReviewDto();
    Object.keys(formValue).forEach(key => reviewDto[key] = formValue[key])

    reviewDto.productId = this.product.productId;
    reviewDto.productVariantId = this.product.variantId;
    reviewDto.productName = this.product.name;

    this.isLoading = true;

    this.productReviewService.addReview(reviewDto)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          this.reviews.push(response.data);
          this.addReviewCmp.closeModal();
          this.showReviewSuccess();
        },
        error => {
          console.warn(error);
        }
      );
  }

  private showReviewSuccess() {
    this.languageService.getTranslation('global.review_successfully_added').subscribe(text => {
      this.notyService.success(text);
    });
  }
}
