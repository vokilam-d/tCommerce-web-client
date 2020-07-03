import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../shared/services/head/head.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { finalize } from 'rxjs/operators';
import { DEFAULT_ERROR_TEXT } from '../../shared/constants';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  error: string = null;
  isLoading: boolean = true;
  private token: string;

  constructor(private headService: HeadService,
              private customerService: CustomerService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.setMeta();
    if (!this.checkToken()) {
      return;
    }

    this.confirmEmail();
  }

  private checkToken() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token === undefined) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  private confirmEmail() {
    this.isLoading = true;
    this.customerService.confirmEmail(this.token)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {},
        error => {
          this.error = error.error?.message || DEFAULT_ERROR_TEXT;
          console.warn(error.error || error);
        }
      );
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Подтверджение email', description: 'Подтверджение email' });
  }
}
