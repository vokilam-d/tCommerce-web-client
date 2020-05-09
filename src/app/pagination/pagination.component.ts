import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UrlService } from '../shared/services/url/url.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  activePage: number;
  pages: number[];
  private pagesToDisplay: number = 3;

  @Input() pagesTotal: number;
  @Output() valueChanged = new EventEmitter();

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

  selectPage(page: number) {
    if (this.activePage === page) { return; }

    this.activePage = page;

    if (this.activePage === 1) {
      this.urlService.deleteQueryParam('page');
    } else {
      this.urlService.setQueryParam('page', this.activePage);
    }
    this.valueChanged.emit();
    this.setPages();
  }

  selectPrevPage() {
    if (this.isPrevBtnDisabled) { return; }
    this.selectPage(this.activePage - 1);
  }

  selectNextPage() {
    if (this.isNextBtnDisabled) { return; }
    this.selectPage(this.activePage + 1);
  }

  loadNextItems() {
    // todo
  }

  private setInitialValue() {
    const pageFromParam = parseInt(this.urlService.getQueryParam('page'));

    this.activePage = pageFromParam || 1;
  }

  private setPages() {
    let start = 2;
    let current = this.activePage;
    let ptd = this.pagesToDisplay;
    let end = ptd;

    if (current <= ptd + 1) {
      end = 4;
    }

    if (current > ptd + 1) {
      start = current - 1;

      if (current >= this.pagesTotal - ptd) {
        start = this.pagesTotal - ptd - 1;
        end = 4;
      }
    }

    if (this.pagesTotal <= ptd + 4) {
      start = 2;
      end = ptd + 2;

      if (this.pagesTotal <= ptd + 2) {
        end = this.pagesTotal - 2;
      }
    }

    this.pages = Array.from(new Array(Math.max(0, end)), (v, i) => i + start);
  }

  isPrevSpreadShown() {
    return this.pagesTotal > this.pagesToDisplay + 4 && this.activePage > this.pagesToDisplay + 1;
  }

  isNextSpreadShown() {
    return this.pagesTotal > this.pagesToDisplay + 4 && this.activePage < this.pagesTotal - this.pagesToDisplay;
  }
}
