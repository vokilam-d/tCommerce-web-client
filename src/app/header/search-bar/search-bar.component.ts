import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { API_HOST, DEFAULT_ERROR_TEXT, SEARCH_QUERY_PARAM, UPLOADED_HOST } from '../../shared/constants';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { ProductService } from '../../pages/product/services/product.service';
import { AutocompleteItemDto } from '../../shared/dtos/autocomplete-item.dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { AutocompleteItemType } from '../../shared/enums/autocomplete-item-type.enum';
import { DeviceService } from '../../services/device-detector/device.service';
import { PreventScrollService } from '../../services/prevent-scroll/prevent-scroll.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent extends NgUnsubscribe implements OnInit, AfterViewInit {

  uploadedHost = UPLOADED_HOST;
  isInFocus: boolean = false;
  searchControl: FormControl;
  searchResults: AutocompleteItemDto[] = null;
  isSearchInProgress: boolean = false;
  searchError: string = null;
  activeIndex: number = null;
  autocompleteItemTypes = AutocompleteItemType;

  @ViewChild('inputRef') inputRef: ElementRef;

  @Output() isSearchBarInFocus = new EventEmitter();

  constructor(
    private deviceService: DeviceService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private preventScrollService: PreventScrollService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.buildControl();
    this.handleAutocomplete();
  }

  ngAfterViewInit(): void {
    this.handleHotkeys();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.preventScrollService.isEnabled$.next(false);
  }

  private buildControl() {
    const initialValue = this.route.snapshot.queryParamMap.get(SEARCH_QUERY_PARAM) || '';
    this.searchControl = new FormControl(initialValue);
  }

  search() {
    const value = this.searchControl.value;
    if (!value) { return; }

    this.searchResults = null;
    this.handleSearchBarInFocus(false);

    this.router.navigate(['/', 'search'], { queryParams: { [SEARCH_QUERY_PARAM]: value } });
  }

  handleSearchBarInFocus(isSearchBarInFocus: boolean) {
    this.isInFocus = isSearchBarInFocus;
    this.isSearchBarInFocus.emit(isSearchBarInFocus);
    if (this.deviceService.isMobile()) {
      this.preventScrollService.isEnabled$.next(this.isInFocus);
    }
  }

  clearInput() {
    this.searchControl.setValue('');
    this.searchResults = null;
    this.inputRef.nativeElement.focus();
  }

  private handleAutocomplete() {
    if (!this.deviceService.isPlatformBrowser()) { return; }

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(200),
        distinctUntilChanged(),
        map(value => value.trim()),
        map(value => value.replace(/,/g, '')), // ',' sign is reserved as array delimiter
        tap(() => this.isSearchInProgress = true),
        switchMap(query => query ? this.fetchAutocompleteItems(query) : of({ data: null })),
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
          this.activeIndex = null;
        }
      );
  }

  private handleHotkeys() {
    if (!this.deviceService.isPlatformBrowser()) { return; }

    fromEvent(this.inputRef.nativeElement, 'keydown')
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        (event: KeyboardEvent) => {
          switch (event.key) {
            case 'Escape':
              this.inputRef.nativeElement.blur();
              this.handleSearchBarInFocus(false);
              break;
            case 'Enter':
              if (this.activeIndex === null) {
                this.search();
              } else {
                this.router.navigate(['/', this.searchResults[this.activeIndex].slug]);
              }
              break;
            case 'ArrowDown':
              event.preventDefault();
              if (this.activeIndex === this.searchResults.length  - 1 || this.activeIndex === null) {
                this.activeIndex = 0;
              } else {
                this.activeIndex += 1;
              }
              break;
            case 'ArrowUp':
              event.preventDefault();
              if (this.activeIndex === 0 || this.activeIndex === null) {
                this.activeIndex = this.searchResults.length  - 1;
              } else {
                this.activeIndex -= 1;
              }
              break;
          }
        }
      );
  }

  getResultImage(product) {
    if (!product.mediaUrl) {
      return '/assets/images/no-img.jpg';
    } else {
      return this.uploadedHost + product.mediaUrl;
    }
  }

  private fetchAutocompleteItems(query: string) {
    return this.http.get<ResponseDto<AutocompleteItemDto[]>>(`${API_HOST}/api/v1/autocomplete/${query}`);
  }
}
