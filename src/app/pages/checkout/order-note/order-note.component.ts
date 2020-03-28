import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-note',
  templateUrl: './order-note.component.html',
  styleUrls: ['./order-note.component.scss', '../checkout-block.scss']
})
export class OrderNoteComponent extends NgUnsubscribe implements OnInit {

  noteControl: FormControl;

  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit(): void {
    this.buildControl();
  }

  private buildControl() {
    this.noteControl = new FormControl();
    this.noteControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(value => this.orderService.note = value);

    this.noteControl.setValue('');
  }
}
