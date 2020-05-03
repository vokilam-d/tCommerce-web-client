import { Component, OnInit, ViewChild } from '@angular/core';
import { HeadService } from '../../shared/services/head/head.service';
import { AddReviewModalComponent, IAddReviewFormValue } from '../../add-review-modal/add-review-modal.component';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { AddStoreReviewDto, StoreReviewDto } from '../../shared/dtos/store-review.dto';
import { StoreReviewService } from '../../shared/services/store-review/store-review.service';
import { NotyService } from '../../noty/noty.service';
import { JsonLdService } from '../../shared/services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'store-reviews',
  templateUrl: './store-reviews.component.html',
  styleUrls: ['./store-reviews.component.scss']
})
export class StoreReviewsComponent implements OnInit {

  jsonLd: SafeHtml;
  reviews: StoreReviewDto[];
  mediaUploadUrl: string = `${API_HOST}/api/v1/store-reviews/media`;
  error: string;

  @ViewChild(AddReviewModalComponent) addReviewCmp: AddReviewModalComponent;

  constructor(private headService: HeadService,
              private notyService: NotyService,
              private jsonLdService: JsonLdService,
              private storeReviewService: StoreReviewService) {

  }

  ngOnInit(): void {
    this.fetchReviews();
    this.setMeta();
  }

  fetchReviews() {
    this.storeReviewService.fetchAllReviews()
      .subscribe(
        response => {
          this.reviews = response.data;
          this.setJsonLd();
        },
        error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }

  private setMeta() {
    this.headService.setMeta({
      title: 'Отзывы Интернет магазина klondike',
      description: 'Отзывы Интернет магазина klondike',
      keywords: ''
    });
  }

  openReviewModal() {
    this.addReviewCmp.openModal();
  }

  onReviewAdd(formValue: IAddReviewFormValue) {
    const reviewDto = new AddStoreReviewDto();
    reviewDto.name = formValue.name;
    reviewDto.text = formValue.text;
    reviewDto.email = formValue.email;
    reviewDto.medias = formValue.medias;
    reviewDto.rating = formValue.rating;

    this.storeReviewService.addReview(reviewDto)
      .subscribe(
        response => {
          this.reviews.unshift(response.data);
          this.addReviewCmp.closeModal();
          this.showReviewSuccess();
        },
        error => {
          console.warn(error);
        }
      );
  }

  vote(review: StoreReviewDto) {
    this.storeReviewService.vote(review.id)
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

  downvote(review: StoreReviewDto) {
    this.storeReviewService.downvote(review.id)
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

  private showReviewSuccess() {
    this.notyService.success(`Ваш отзыв успешно оставлен`);
  }

  private setJsonLd() {
    const jsonLd: any = {
      '@context': 'http://schema.org',
      '@type': 'Store',
      'name': 'Klondike',
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": `${this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length}}`,
        "reviewCount": `${this.reviews.length}}`
      },
      "review": this.reviews.map(review => ({
        "@type": "Review",
        "author": review.name,
        "datePublished": review.createdAt,
        "description": review.text,
        "reviewRating": {
          "@type": "Rating",
          "bestRating": "5",
          "ratingValue": review.rating,
          "worstRating": "1"
        }
      }))
    };

    this.jsonLd = this.jsonLdService.getSafeJsonLd(jsonLd);
  }
}
