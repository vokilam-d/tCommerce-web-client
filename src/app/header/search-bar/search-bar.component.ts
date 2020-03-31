import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../shared/services/search/search.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';
import { DEFAULT_ERROR_TEXT, API_HOST } from '../../shared/constants';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit, OnDestroy {

  uploadedHost = API_HOST;
  isInFocus: boolean = false;
  searchControl = new FormControl('');
  searchResults: ProductListItemDto[] = null;
  isSearchInProgress: boolean = false;
  searchError: string = null;

  private ngUnsubscribe = new Subject();

  @ViewChild('inputRef') inputRef: ElementRef;

  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
    this.handleAutocomplete();
  }

  ngAfterViewInit(): void {
    this.handleHotkeys();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  search() {
    const value = this.searchControl.value;
    if (!value) { return; }

    this.router.navigate(['/', 'search'], { queryParams: { q: value } });
  }

  clearInput() {
    this.searchControl.setValue('');
    this.searchResults = null;
    this.inputRef.nativeElement.focus();
  }

  private handleAutocomplete() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(value => value.trim()),
        map(value => value.replace(/,/g, '')), // ',' sign is reserved as array delimiter
        filter(value => !!value),
        tap(() => this.isSearchInProgress = true),
        switchMap(query => this.searchService.autocompleteProducts(query)),
        catchError((err, caught) => {
          this.searchResults = null;
          this.searchError = (err.error && err.error.message) || DEFAULT_ERROR_TEXT;
          this.isSearchInProgress = false;
          return caught;
        }),
        takeUntil(this.ngUnsubscribe)
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
