import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { DetailedCustomerDto } from '../../shared/dtos/detailed-customer.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { finalize, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { HeadService } from '../../shared/services/head/head.service';

type ChildRoute = { link: string; label: string };

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends NgUnsubscribe implements OnInit {

  childRoutes: ChildRoute[];
  breadcrumbs: IBreadcrumb[] = [{ title: 'Контакты' }];
  emailConfirmationSent: boolean;
  isLoading: boolean;
  private isFirstRouteActivated: boolean = false;

  @ViewChildren('routerLink') routerLinksRefs: QueryList<ElementRef>;

  get customer(): DetailedCustomerDto { return this.customerService.customer as DetailedCustomerDto; }

  constructor(private customerService: CustomerService,
              @Inject(PLATFORM_ID) private platformId: any,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private headService: HeadService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.setChildRoutes();
    if (!isPlatformBrowser(this.platformId)) { return; }

    this.fetchAccount();
    this.handleBreadrumbsUpdate();
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

  private handleBreadrumbsUpdate() {
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
    if (this.isFirstRouteActivated || !isPlatformBrowser(this.platformId)) { return; }
    this.isFirstRouteActivated = true;

    const { nativeElement: activeEl } = this.routerLinksRefs.find(elRef => elRef.nativeElement.className.includes('--active'));
    activeEl.offsetParent.scrollLeft = activeEl.offsetLeft + activeEl.offsetWidth - activeEl.offsetParent.offsetWidth + 40;
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
