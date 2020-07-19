import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BlogPostListItemDto } from '../shared/dtos/blog-post-list-item.dto';
import { BlogService } from '../services/blog/blog.service';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../shared/constants';
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
  uploadedHost = API_HOST;

  @Input() categoryId: number;
  @Input() query: string;
  @ViewChild('itemsRef') itemsRef: ElementRef;
  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private blogService: BlogService,
              private jsonLdService: JsonLdService,
              private scrollToService: ScrollToService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.fetchList());
  }

  private fetchList() {
    const params: any = {
      page: this.paginationCmp.getValue()
    };

    if (this.categoryId) {
      params.categoryId = this.categoryId;
    } else if (this.query) {
      params.query = this.query;
    }

    this.isLoading = true;
    this.blogService.getPostsList(params)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.items = response.data;
          this.pagesTotal = response.pagesTotal;
          this.setJsonLd();
        },
        error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }

  onPaginationChanged() {
    this.scrollToService.scrollTo({ target: this.itemsRef, offset: -100, duration: 700 });
    this.fetchList();
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
