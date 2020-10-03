import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UrlService } from '../services/url/url.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  activePage: number;
  pages: number[];
  private pagesToDisplay: number = 3;

  @Input() displayedOnPage: string;
  @Input() pagesTotal: number;
  @Output() pagination = new EventEmitter();
  @Output() paginationWithLoadMoreBtn = new EventEmitter();

  get isPrevBtnDisabled() { return this.activePage <= 1; }
  get isNextBtnDisabled() { return this.pagesTotal === 1 || this.activePage >= this.pagesTotal; }

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.setInitialValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pagesTotal && changes.pagesTotal.currentValue) {
      this.setPages();
    }
  }

  getValue() {
    return this.activePage;
  }

  selectPage(page: number, withLoadMoreBtn: boolean) {
    if (this.activePage === page) { return; }

    this.activePage = page;

    if (this.activePage === 1) {
      this.urlService.deleteQueryParam('page');
    } else {
      this.urlService.setQueryParam('page', this.activePage);
    }

    if (withLoadMoreBtn) {
      this.paginationWithLoadMoreBtn.emit();
    } else {
      this.pagination.emit();
    }

    this.setPages();
  }

  selectPrevPage() {
    if (this.isPrevBtnDisabled) { return; }
    this.selectPage(this.activePage - 1, false);
  }

  selectNextPage() {
    if (this.isNextBtnDisabled) { return; }
    this.selectPage(this.activePage + 1, false);
  }

  loadMoreItems() {
    this.selectPage(this.activePage + 1, true);
  }

  private setInitialValue() {
    const pageFromParam = parseInt(this.urlService.getQueryParam('page'));

    this.activePage = pageFromParam || 1;
  }

  private setPages() {
    let start = 2;
    let current = this.activePage;
    let end = this.pagesToDisplay;

    if (current <= this.pagesToDisplay + 1) {
      end = this.pagesToDisplay + 1;
    }

    if (current > this.pagesToDisplay + 1) {
      start = current - Math.floor(this.pagesToDisplay / 2);

      if (current >= this.pagesTotal - this.pagesToDisplay) {
        start = this.pagesTotal - this.pagesToDisplay - 1;
        end = this.pagesToDisplay + 1;
      }
    }

    if (this.pagesTotal <= this.pagesToDisplay + this.pagesToDisplay + 1) {
      start = 2;
      end = this.pagesToDisplay + 2;

      if (this.pagesTotal <= this.pagesToDisplay + 2) {
        end = this.pagesTotal - 2;
      }
    }

    this.pages = Array.from(new Array(Math.max(0, end)), (v, i) => i + start);
  }

  isPrevSpreadShown() {
    return this.pagesTotal > this.pagesToDisplay + this.pagesToDisplay + 1 && this.activePage > this.pagesToDisplay + 1;
  }

  isNextSpreadShown() {
    return this.pagesTotal > this.pagesToDisplay + this.pagesToDisplay + 1 && this.activePage < this.pagesTotal - this.pagesToDisplay;
  }
}
