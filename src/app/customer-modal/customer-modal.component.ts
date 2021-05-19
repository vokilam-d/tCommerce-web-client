import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { NotyService } from '../noty/noty.service';
import { LanguageService } from '../services/language/language.service';
import { PreventScrollService } from '../services/prevent-scroll/prevent-scroll.service';

@Component({
  selector: 'customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent extends NgUnsubscribe implements OnInit {

  isModalVisible: boolean = false;
  state: 'login' | 'registration' = 'login';
  private unlisten: () => void;

  constructor(
    private renderer: Renderer2,
    private notyService: NotyService,
    private customerService: CustomerService,
    private languageService: LanguageService,
    private preventScrollService: PreventScrollService
  ) {
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
    this.preventScrollService.isEnabled$.next(false);
  }

  openModal() {
    this.isModalVisible = true;
    this.unlisten = this.renderer.listen('window', 'keyup', event => this.onKeyPress(event));
    this.preventScrollService.isEnabled$.next(true);
  }

  closeModal() {
    if (this.unlisten) { this.unlisten(); }
    this.isModalVisible = false;
    this.preventScrollService.isEnabled$.next(false);
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
      this.languageService.getTranslation('customer_modal.verify_email').subscribe(text => {
        this.notyService.success(text);
      })
    }
    this.closeModal();
  }

  onRegisterBySocial() {
    this.onRegister(true);
  }
}
