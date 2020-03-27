import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgUnsubscribe } from '../directives/ng-unsubscribe.directive';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.scss']
})
export class QuantityControlComponent extends NgUnsubscribe implements OnInit {

  qtyControl: FormControl;
  @Input() initialValue: number = 1;
  @Output() valueChanged = new EventEmitter<number>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.qtyControl = new FormControl(this.initialValue, { updateOn: 'blur' });
    this.qtyControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(value => this.valueChanged.emit(value));
  }

  incrementQty() {
    let qty = this.getValue();
    this.setValue(++qty);
  }

  decrementQty() {
    let qty = this.getValue();
    if (qty <= 1) { return; }

    this.setValue(--qty);
  }

  setValue(value: number, emitEvent: boolean = true) {
    this.qtyControl.setValue(value, { emitEvent });
  }

  getValue() {
    return this.qtyControl.value;
  }
}
