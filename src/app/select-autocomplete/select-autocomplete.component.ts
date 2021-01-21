import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY, fromEvent, Observable, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { ResponseDto } from '../shared/dtos/response.dto';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { AddressService } from '../services/address/address.service';
import { StreetDto } from '../shared/dtos/street.dto';
import { DEFAULT_ERROR_TEXT } from '../shared/constants';
import { SettlementDto } from '../shared/dtos/settlement.dto';
import { WarehouseDto } from '../shared/dtos/warehouse.dto';
import { ISelectOption } from './select-option.interface';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectAutocompleteComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAutocompleteComponent extends NgUnsubscribe implements OnInit, AfterViewInit, ControlValueAccessor {

  isSearchInProgress: boolean = false;
  searchError: string = null;
  isVisible: boolean = false;
  options: ISelectOption[] = [];
  placeholder: string = '';
  private value: any;
  private inputSubscription: Subscription;

  @Input() activeOptionLabel: string;
  @Input() isDisabled: boolean = false;
  @Input() type: 'settlement' | 'warehouse' | 'street';
  @Input() settlementId?: string;
  @Output() select: EventEmitter<any> = new EventEmitter();

  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;

  constructor(private addressService: AddressService,
              private cdr: ChangeDetectorRef,
              private languageService: LanguageService
  ) {
    super();
  }

  ngOnInit() {
    this.getPlaceholder(this.type);
  }

  ngAfterViewInit() {
    if (!this.type) {
      throw new Error('"type" is not provided!');
    }
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.select.emit(value);
  }

  selectOption(option: ISelectOption) {
    this.toggleVisibility(false);

    this.writeValue(option.data);
    this.onTouched();
  }

  toggleVisibility(isVisible: boolean = !this.isVisible) {
    if (this.isDisabled) {
      return;
    }

    this.isVisible = isVisible;
    if (this.isVisible) {
      setTimeout(() => this.inputRef.nativeElement.focus(), 50);
      this.listenForInput();
    } else {
      this.inputSubscription?.unsubscribe();
    }
  }

  private listenForInput() {
    this.inputSubscription = fromEvent(this.inputRef.nativeElement, 'input')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(200),
        distinctUntilChanged(),
        map((event: InputEvent) => (event.target as HTMLInputElement).value.trim()),
        startWith(''),
        tap(() => {
          this.isSearchInProgress = true;
          this.cdr.markForCheck();
        }),
        switchMap(query => this.getRequestByQuery(query).pipe(
          catchError((err, caught) => {
            this.searchError = err.error?.message || DEFAULT_ERROR_TEXT;
            console.error(err);
            this.isSearchInProgress = false;
            this.cdr.markForCheck();
            return EMPTY;
          })
        ))
      )
      .subscribe(
        response => {
          this.options = this.transformResponse(response);
          this.searchError = null;
          this.isSearchInProgress = false;
          this.cdr.markForCheck();
        }
      );
  }

  private getRequestByQuery(query: string): Observable<ResponseDto<any>> {
    switch (this.type) {
      case 'settlement':
        return this.addressService.fetchSettlements(query);
      case 'warehouse':
        return this.addressService.fetchWarehouses(this.settlementId, query);
      case 'street':
        return this.addressService.fetchStreets(this.settlementId, query);
    }
  }

  private transformResponse({ data }: ResponseDto<any[]>): ISelectOption[] {
    switch (this.type) {
      case 'settlement':
        return (data as SettlementDto[]).map(settlement => ({ data: settlement, view: settlement.fullName }));
      case 'warehouse':
        return (data as WarehouseDto[]).map(warehouse => ({ data: warehouse, view: warehouse.description }));
      case 'street':
        return (data as StreetDto[]).map(street => ({ data: street, view: street.name }));
    }
  }

  getPlaceholder(type: string) {
    this.languageService.getTranslation(`select_autocomplete.${type}`).subscribe(text => {
      this.placeholder = text;
    });
  }
}
