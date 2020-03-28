import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderService } from '../order.service';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'callback-needed',
  templateUrl: './callback-needed.component.html',
  styleUrls: ['./callback-needed.component.scss', '../checkout-block.scss']
})
export class CallbackNeededComponent extends NgUnsubscribe implements OnInit {

  isCallbackNeededControl: FormControl;

  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit(): void {
    this.buildControl();
  }

  private buildControl() {
    this.isCallbackNeededControl = new FormControl();
    this.isCallbackNeededControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(value => this.orderService.isCallbackNeeded = value);

    this.isCallbackNeededControl.setValue(false);
  }
}
