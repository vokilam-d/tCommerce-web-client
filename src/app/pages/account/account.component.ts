import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { finalize, takeUntil } from 'rxjs/operators';
import { HeadService } from '../../services/head/head.service';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { DeviceService } from '../../services/device-detector/device.service';
import { onWindowLoad } from '../../shared/helpers/on-window-load.function';
import { LanguageService } from '../../services/language/language.service';

type ChildRoute = { link: string; label: string };

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends NgUnsubscribe implements OnInit {

  childRoutes: ChildRoute[];
  breadcrumbs: IBreadcrumb[] = [];
  emailConfirmationSent: boolean;
  isLoading: boolean;
  private isFirstRouteActivated: boolean = false;

  @ViewChildren('routerLink') routerLinksRefs: QueryList<ElementRef>;

  get customer(): CustomerDto { return this.customerService.customer; }

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private headService: HeadService,
    private router: Router,
    private deviceService: DeviceService,
    private languageService: LanguageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setChildRoutes();
    if (!this.deviceService.isPlatformBrowser()) { return; }

    this.fetchAccount();
    this.handleBreadcrumbs();
    this.handleLogout();
    this.setMeta();
  }

  private fetchAccount() {
    this.isLoading = true;
    this.customerService.fetchCustomerDetails()
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.customerService.setCustomer(response.data);
        },
        error => {
          if (error.error.statusCode === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      );
  }

  private setChildRoutes() {
    this.childRoutes = this.route.routeConfig.children
      .filter(route => route.data && route.data.label)
      .map(route => {
        return {
          link: route.path === '' ? './' : route.path,
          label: route.data.label
        };
      });
  }

  private handleBreadcrumbs() {
    this.languageService.getTranslation('global.contacts').subscribe(text => {
      this.breadcrumbs = [{ title: text }];
    });

    const setBreadcrumbs = () => {
      const snapshot = this.route.firstChild.snapshot;
      const link = snapshot.url[0] && snapshot.url[0].path;
      const title = snapshot.data.label;

      this.breadcrumbs = [{ link, title }];
    };

    setBreadcrumbs();

    this.router.events
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          setBreadcrumbs();
        }
      });
  }

  sendEmailConfirm() {
    this.customerService.sendEmailConfirm()
      .subscribe(
        response => {
          this.emailConfirmationSent = true;
        }
      );
  }

  onActivate() {
    if (this.isFirstRouteActivated || !this.deviceService.isPlatformBrowser()) { return; }
    this.isFirstRouteActivated = true;

    onWindowLoad(this, () => {
      const { nativeElement: activeEl } = this.routerLinksRefs.find(elRef => elRef.nativeElement.className.includes('--active'));
      activeEl.offsetParent.scrollLeft = activeEl.offsetLeft + activeEl.offsetWidth - activeEl.offsetParent.offsetWidth + 40;
    });
  }

  private handleLogout() {
    this.customerService.customer$
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        customer => {
          if (!customer) {
            this.router.navigate(['/']);
          }
        }
      )
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Личный кабинет', description: 'Личный кабинет' });
  }

  logout() {
    this.customerService.logout();
  }
}
