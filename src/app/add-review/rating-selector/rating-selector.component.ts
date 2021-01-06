import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rating-selector',
  templateUrl: './rating-selector.component.html',
  styleUrls: ['./rating-selector.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingSelectorComponent),
    multi: true
  }]
})
export class RatingSelectorComponent implements OnInit, ControlValueAccessor {

  value: number;
  disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  selectRating(rating: number) {
    if (this.disabled) {
      return;
    }
    this.writeValue(rating);
    this.onTouched();
  }
}

