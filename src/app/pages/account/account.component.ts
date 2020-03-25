import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { CustomerService } from '../../shared/services/user/customer.service';
import { AccountDto } from '../../shared/dtos/account.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';

type ChildRoute = { link: string; label: string };

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends NgUnsubscribe implements OnInit, OnDestroy {

  childRoutes: ChildRoute[];
  breadcrumbs: IBreadcrumb[] = [{ title: 'Контакты' }];
  emailConfirmationSent: boolean;
  private isFirstRouteActivated: boolean = false;

  @ViewChildren('routerLink') routerLinksRefs: QueryList<ElementRef>;

  get account(): AccountDto { return this.customerService.account; }

  constructor(private customerService: CustomerService,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.fetchAccount();
    this.setChildRoutes();
    this.handleBreadrumbsUpdate();
  }

  ngOnDestroy(): void {
    this.customerService.account = null;
    super.ngOnDestroy();
  }

  private fetchAccount() {
    this.customerService.fetchAccount()
      .subscribe(
        response => {
          this.customerService.account = response.data;
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
    if (this.isFirstRouteActivated) { return; }
    this.isFirstRouteActivated = true;

    const { nativeElement: activeEl } = this.routerLinksRefs.find(elRef => elRef.nativeElement.className.includes('--active'));
    activeEl.offsetParent.scrollLeft = activeEl.offsetLeft + activeEl.offsetWidth - activeEl.offsetParent.offsetWidth + 40;
  }
}
