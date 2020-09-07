import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { BlogPostListItemDto } from '../shared/dtos/blog-post-list-item.dto';
import { BlogService } from '../services/blog/blog.service';
import { DEFAULT_ERROR_TEXT, UPLOADED_HOST } from '../shared/constants';
import { finalize } from 'rxjs/operators';
import { PaginationComponent } from '../pagination/pagination.component';
import { ScrollToService } from '../services/scroll-to/scroll-to.service';
import { JsonLdService } from '../services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'blog-posts-list',
  templateUrl: './blog-posts-list.component.html',
  styleUrls: ['./blog-posts-list.component.scss']
})
export class BlogPostsListComponent implements OnInit, AfterViewInit {

  jsonLd: SafeHtml;
  items: BlogPostListItemDto[];
  pagesTotal: number;
  error: string;
  isLoading: boolean = false;
  uploadedHost = UPLOADED_HOST;

  @Input() categoryId: number;
  @Input() query: string;
  @ViewChildren('itemRef') itemRefList: QueryList<ElementRef>;
  @ViewChild('itemsRef') itemsRef: ElementRef;
  @ViewChild('paginationRef', { read: ElementRef }) paginationRef: ElementRef;
  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private blogService: BlogService,
              private jsonLdService: JsonLdService,
              private scrollToService: ScrollToService,
              private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.fetchList());
  }

  private fetchList(withLoadMoreBtn?: boolean) {
    const params: any = {
      page: this.paginationCmp.getValue()
    };

    if (this.categoryId) {
      params.categoryId = this.categoryId;
    } else if (this.query) {
      params.query = this.query;
    }

    let scrollOffset;
    if (withLoadMoreBtn) {
      const paginationRect = this.paginationRef.nativeElement.getBoundingClientRect();
      scrollOffset = window.pageYOffset + paginationRect.top + paginationRect.height - window.innerHeight;
      window.scroll(0, scrollOffset);
    }

    this.isLoading = true;
    this.blogService.getPostsList(params)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          if (withLoadMoreBtn) {
            this.items.push(...response.data);

            this.changeDetectorRef.detectChanges();
            window.scroll(0, scrollOffset);

            const firstAddedItemIndex = this.items.length - response.data.length;
            this.scrollToItem(firstAddedItemIndex);
          } else {
            this.items = response.data;
          }
          this.pagesTotal = response.pagesTotal;
          this.setJsonLd();
        },
        error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }

  onPaginationChanged() {
    this.scrollToService.scrollTo({ target: this.itemsRef, offset: -100, duration: 700 });
    this.fetchList(false);
  }

  onPaginationWithLoadMoreBtn() {
    this.fetchList(true);
  }

  scrollToItem(itemIndex: number): void {
    const firstAddedItem = this.itemRefList.find((reference, index) => index === itemIndex);
    this.scrollToService.scrollTo({ target: firstAddedItem, offset: -80, duration: 700 });
  }

  private setJsonLd() {
    this.jsonLd = this.jsonLdService.getSafeJsonLd({
      "@context":"http://schema.org",
      "@type":"Blog",
      "blogPost": this.items.map(item => ({
        "@type": "BlogPosting",
        "@id": `https://klondike.com.ua/blog/${item.slug}`,
        "headline": item.name,
        "abstract": item.shortContent,
        "datePublished": item.publishedAt,
        "dateModified": item.updatedAt,
        "mainEntityOfPage": "https://klondike.com.ua/blog/",
        ...(item.featuredMedia ? {
          "@type": "ImageObject",
          "url": `https://klondike.com.ua${item.featuredMedia.variantsUrls.original}`
        } : { })
      }))
    });
  }
}
