import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[ngUnsubscribe]'
})
export class NgUnsubscribe implements OnDestroy {

  protected ngUnsubscribe = new Subject();

  constructor() { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
