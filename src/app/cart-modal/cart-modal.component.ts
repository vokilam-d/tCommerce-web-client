import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PreventScrollService } from '../services/prevent-scroll/prevent-scroll.service';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent extends NgUnsubscribe implements OnInit {

  isCrossSellVisible: boolean = false;
  isModalVisible: boolean = false;
  private unlisten: () => void;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private preventScrollService: PreventScrollService,
    private renderer: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
    this.customerService.showCartModal$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(isCrossSellVisible => this.openModal(isCrossSellVisible));
  }

  ngOnDestroy(): void {
    if (this.unlisten) { this.unlisten(); }
    this.preventScrollService.isEnabled$.next(false);
    super.ngOnDestroy();
  }

  private openModal(isCrossSellVisible: boolean = false) {
    this.isCrossSellVisible = isCrossSellVisible;
    this.isModalVisible = true;
    this.unlisten = this.renderer.listen('window', 'keyup', event => this.onKeyPress(event));
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.closeModal());

    this.preventScrollService.isEnabled$.next(true);
  }

  closeModal() {
    if (this.unlisten) { this.unlisten(); }
    this.isModalVisible = false;
    this.isCrossSellVisible = false;
    this.preventScrollService.isEnabled$.next(false);
  }

  private onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
    }
  }
}
