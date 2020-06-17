import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from '../shared/services/customer/customer.service';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { NotyService } from '../noty/noty.service';

@Component({
  selector: 'customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent extends NgUnsubscribe implements OnInit {

  isModalVisible: boolean = false;
  state: 'login' | 'registration' = 'login';
  private unlisten: () => void;

  constructor(private renderer: Renderer2,
              private notyService: NotyService,
              private customerService: CustomerService) {
    super();
  }

  ngOnInit(): void {
    this.customerService.showLoginModal$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(() => this.openModal());
  }

  ngOnDestroy(): void {
    if (this.unlisten) { this.unlisten(); }
    super.ngOnDestroy();
  }

  openModal() {
    this.isModalVisible = true;
    this.unlisten = this.renderer.listen('window', 'keyup', event => this.onKeyPress(event));
  }

  closeModal() {
    if (this.unlisten) { this.unlisten(); }
    this.isModalVisible = false;
  }

  toggleState() {
    this.state = this.state === 'login' ? 'registration' : 'login';
  }

  private onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
    }
  }

  onLogin() {
    this.closeModal();
  }

  onRegister(isEmailConfirmed: boolean = false) {
    if (!isEmailConfirmed) {
      this.notyService.success(`Пожалуйста, подтвердите почту - на указанный email было отправлено письмо с инструкцией.`);
    }
    this.closeModal();
  }

  onRegisterBySocial() {
    this.onRegister(true);
  }
}
