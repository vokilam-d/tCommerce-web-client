import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { ScrollToService } from '../../../shared/services/scroll-to/scroll-to.service';
import { ProductReviewService } from '../product-review.service';
import { AddProductReviewDto, ProductReviewDto } from '../../../shared/dtos/product-review.dto';
import { JsonLdService } from '../../../shared/services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';
import { AddReviewModalComponent, IAddReviewFormValue } from '../../../add-review-modal/add-review-modal.component';
import { API_HOST } from '../../../shared/constants';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  jsonLd: SafeHtml;
  indices = {
    description: 0,
    chars: 1,
    reviews: 2
  };
  activeIdx: number = 0;
  mediaUploadUrl: string = `${API_HOST}/api/v1/product-reviews/media`;

  reviews: ProductReviewDto[] = [];

  @Input() product: ProductDto;
  @ViewChild(AddReviewModalComponent) addReviewCmp: AddReviewModalComponent;

  constructor(private http: HttpClient,
              private scrollToService: ScrollToService,
              private jsonLdService: JsonLdService,
              private productReviewService: ProductReviewService,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    if (this.product.reviewsCount > 0) {
      this.fetchReviews();
    } else {
      this.setJsonLd();
    }
  }

  openReviewsTab() {
    this.toggleContent(this.indices.reviews);
  }

  private fetchReviews() {
    this.productReviewService.fetchProductReviews(this.product.productId)
      .subscribe(
        response => {
          this.reviews = response.data;
          this.setJsonLd();
        }
      );
  }

  toggleContent(idx: number, force: boolean = false) {
    if (!force && this.activeIdx === idx) {
      this.activeIdx = null;
      return;
    }

    this.activeIdx = idx;
    this.scrollToService.scrollTo({ target: this.elementRef, offset: -20 });
  }

  keyValuePipeComparator(a: KeyValue<string, number>, b: KeyValue<string, number>): number {
    return a.value - b.value;
  }

  toggleCommentForm(review: ProductReviewDto, state: boolean = !review.isCommentFormVisible) {
    review.isCommentFormVisible = state;
  }

  vote(review: ProductReviewDto) {
    this.productReviewService.vote(review.id)
      .subscribe(
        response => {
          review.voteSuccess = true;
          review.votesCount = response.data.votesCount;
        },
        error => {
          review.voteError = error.error.message;
        }
      );
  }

  downvote(review: ProductReviewDto) {
    this.productReviewService.downvote(review.id)
      .subscribe(
        response => {
          review.voteSuccess = true;
          review.votesCount = response.data.votesCount;
        },
        error => {
          review.voteError = error.error.message;
        }
      );
  }

  onCommentFormSubmit(review: ProductReviewDto, formValue: any) {
    this.productReviewService.addComment(review.id, formValue)
      .subscribe(
        response => {
          review.isCommentFormVisible = false;
          review.comments = response.data.comments;
        }
      );
  }

  openReviewModal() {
    this.addReviewCmp.openModal();
  }

  onReviewAdd(formValue: IAddReviewFormValue) {
    const reviewDto = new AddProductReviewDto();
    reviewDto.name = formValue.name;
    reviewDto.text = formValue.text;
    reviewDto.email = formValue.email;
    reviewDto.medias = formValue.medias;
    reviewDto.rating = formValue.rating;

    reviewDto.productId = this.product.productId;
    reviewDto.productVariantId = this.product.variantId;
    reviewDto.productName = this.product.name;


    this.productReviewService.addReview(reviewDto)
      .subscribe(
        response => {
          this.reviews.push(response.data);
          this.addReviewCmp.closeModal();
        },
        error => {
          console.warn(error);
        }
      )

  }

  private setJsonLd() {

    const jsonLd: any = {
      '@context': "http://schema.org",
      '@type': "Product",
      'itemCondition': "https://schema.org/NewCondition",
      'description': this.product.fullDescription,
      'name': this.product.name,
      'offers': {
        '@type': "Offer",
        'availability': this.product.isInStock ? "http://schema.org/InStock" : 'http://schema.org/OutOfStock',
        'price': this.product.price,
        'priceCurrency': "UAH",
        'priceValidUntil': "2040-12-08",
        'url': `https://klondike.com.ua/${this.product.slug}`
      },
      'url': `https://klondike.com.ua/${this.product.slug}`
    };

    if (this.product.vendorCode) {
      jsonLd.sku = this.product.vendorCode;
      jsonLd.identifier = this.product.sku;
    } else {
      jsonLd.sku = this.product.sku;
    }

    if (this.product.gtin) {
      jsonLd.gtin = this.product.gtin;
    }

    const manufacturer = this.product.characteristics.find(c => c.code === 'manufacturer');
    if (manufacturer) {
      jsonLd.brand = manufacturer;
      jsonLd.manufacturer = manufacturer;
    }

    if (this.product.medias[0]) {
      jsonLd.image = `https://klondike.com.ua${this.product.medias[0].variantsUrls.original}`;
    }

    if (this.product.reviewsCount > 0) {
      jsonLd.aggregateRating = {
        '@type': "AggregateRating",
        'ratingValue': this.product.reviewsAvgRating,
        'reviewCount': this.product.reviewsCount
      };

      jsonLd.review = this.reviews.map(review => ({
        '@type': "Review",
        'author': review.name,
        'datePublished': review.createdAt,
        'description': review.text
      }));
    }

    this.jsonLd = this.jsonLdService.getSafeJsonLd(jsonLd);
  }
}
