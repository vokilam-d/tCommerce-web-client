import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from '../shared/services/customer/customer.service';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent extends NgUnsubscribe implements OnInit {

  isModalVisible: boolean = false;
  private unlisten: () => void;

  constructor(private customerService: CustomerService,
              private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.customerService.showCartModal$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(() => this.openModal());
  }

  ngOnDestroy(): void {
    if (this.unlisten) { this.unlisten(); }
    super.ngOnDestroy();
  }

  private openModal() {
    this.isModalVisible = true;
    this.unlisten = this.renderer.listen('window', 'keyup', event => this.onKeyPress(event));
  }

  closeModal() {
    if (this.unlisten) { this.unlisten(); }
    this.isModalVisible = false;
  }

  private onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
    }
  }
}
