import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';
import { API_HOST, DEFAULT_ERROR_TEXT, SEARCH_QUERY_PARAM } from '../../shared/constants';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../pages/product/product.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent extends NgUnsubscribe implements OnInit, AfterViewInit {

  uploadedHost = API_HOST;
  isInFocus: boolean = false;
  searchControl: FormControl;
  searchResults: ProductListItemDto[] = null;
  isSearchInProgress: boolean = false;
  searchError: string = null;

  @ViewChild('inputRef') inputRef: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.buildControl();
    this.handleAutocomplete();
  }

  ngAfterViewInit(): void {
    this.handleHotkeys();
  }

  private buildControl() {
    const initialValue = this.route.snapshot.queryParamMap.get(SEARCH_QUERY_PARAM) || '';
    this.searchControl = new FormControl(initialValue);
  }

  search() {
    const value = this.searchControl.value;
    if (!value) { return; }

    this.searchResults = null;
    this.router.navigate(['/', 'search'], { queryParams: { [SEARCH_QUERY_PARAM]: value } });
  }

  clearInput() {
    this.searchControl.setValue('');
    this.searchResults = null;
    this.inputRef.nativeElement.focus();
  }

  private handleAutocomplete() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(200),
        distinctUntilChanged(),
        map(value => value.trim()),
        map(value => value.replace(/,/g, '')), // ',' sign is reserved as array delimiter
        tap(() => this.isSearchInProgress = true),
        switchMap(query => query ? this.productService.fetchProductsByAutocomplete(query) : of({ data: null })),
        catchError((err, caught) => {
          this.searchResults = null;
          this.searchError = (err.error && err.error.message) || DEFAULT_ERROR_TEXT;
          this.isSearchInProgress = false;
          return caught;
        })
      )
      .subscribe(
        response => {
          this.searchResults = response.data;
          this.searchError = null;
          this.isSearchInProgress = false;
        }
      );
  }

  private handleHotkeys() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        (event: KeyboardEvent) => {
          switch (event.key) {
            case 'Escape':
              this.inputRef.nativeElement.blur();
              this.isInFocus = false;
              break;
            case 'Enter':
              this.search();
              break;
          }
        }
      );
  }
}
