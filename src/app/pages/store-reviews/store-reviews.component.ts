import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeadService } from '../../services/head/head.service';
import { AddReviewModalComponent, IAddReviewFormValue } from '../../add-review-modal/add-review-modal.component';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { AddStoreReviewDto, StoreReviewDto } from '../../shared/dtos/store-review.dto';
import { StoreReviewService } from '../../services/store-review/store-review.service';
import { NotyService } from '../../noty/noty.service';
import { JsonLdService } from '../../services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { DeviceService } from '../../services/device-detector/device.service';
import { ScrollToService } from '../../services/scroll-to/scroll-to.service';
import { ESort } from '../../shared/enums/sort.enum';
import { SortingComponent } from '../../product-list/sorting/sorting.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { SortingPaginatingFilterDto } from '../../shared/dtos/spf.dto';

@Component({
  selector: 'store-reviews',
  templateUrl: './store-reviews.component.html',
  styleUrls: ['./store-reviews.component.scss']
})
export class StoreReviewsComponent extends NgUnsubscribe implements OnInit, AfterViewInit {

  jsonLd: SafeHtml;
  reviews: StoreReviewDto[];
  mediaUploadUrl: string = `${API_HOST}/api/v1/store-reviews/media`;
  error: string;
  averageReviewsRating: number;
  pagesTotal: number;
  reviewsTotal: number;
  page: number;
  sortOptions: ESort[] = [ESort.New, ESort.Old, ESort.Popularity,ESort.HighRating, ESort.LowRating];
  get storeReviewsCount(): number { return this.storeReviewService.storeReviewsCount; }

  @ViewChild('reviewsContainerRef') reviewsContainerRef: ElementRef;
  @ViewChild(AddReviewModalComponent) addReviewCmp: AddReviewModalComponent;
  @ViewChild(SortingComponent) sortingCmp: SortingComponent;
  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;


  constructor(private headService: HeadService,
              private notyService: NotyService,
              private jsonLdService: JsonLdService,
              private storeReviewService: StoreReviewService,
              private deviceService: DeviceService,
              private scrollToService: ScrollToService,
  ) { super(); }

  ngOnInit(): void {
    this.setMeta();
    this.setAverageReviewsRating();
  }

  ngAfterViewInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    const sortingValue = this.sortingCmp.getValue();
    const paginationValue = this.paginationCmp.getValue();
    const spf = new SortingPaginatingFilterDto();

    spf.sort = sortingValue;
    spf.page = paginationValue;

    this.storeReviewService.fetchAllReviews(spf)
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        response => {
          this.reviews = response.data;
          this.pagesTotal = response.pagesTotal;
          this.reviewsTotal = response.itemsTotal;
          this.page = response.page;

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
        "ratingValue": this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length,
        "reviewCount": this.reviews.length
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

  setAverageReviewsRating() {
    return this.storeReviewService.countAverageRating().subscribe(average => {
      this.averageReviewsRating = average;
    });
  }

  scrollToReviews() {
    this.scrollToService.scrollTo({ target: this.reviewsContainerRef, offset: -100, duration: 700 });
  }

  onPagination() {
    this.scrollToReviews();
    this.fetchReviews();
  }
}
