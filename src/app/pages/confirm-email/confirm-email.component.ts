import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../services/head/head.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { finalize } from 'rxjs/operators';
import { DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { DeviceService } from '../../services/device-detector/device.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  error: string = null;
  isLoading: boolean = true;
  private token: string;

  constructor(
    private headService: HeadService,
    private deviceService: DeviceService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
    if (!this.checkToken()) {
      return;
    }

    if (this.deviceService.isPlatformServer()) {
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
        _ => {},
        error => {
          this.error = error.error?.message || DEFAULT_ERROR_TEXT;
          console.warn(error.error || error);
        }
      );
  }

  private setMeta() {
    this.languageService.getTranslation('confirm_email.confirmation').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
