import { HttpClient } from '@angular/common/http';
import { API_HOST, BLOG_PATH, DUMMY_PATH } from '../constants';
import { Route, Router, Routes } from '@angular/router';
import { InjectionToken, Injector } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { PageRegistryDto } from '../dtos/page-registry.dto';
import { PageTypeEnum } from '../enums/page-type.enum';
import { tap } from 'rxjs/operators';
import { ResponseDto } from '../dtos/response.dto';
import { isPlatformServer } from '@angular/common';
import { Language } from '../enums/language.enum';

export const PAGES_TOKEN = new InjectionToken<PageRegistryDto[]>('pages_token');
export const PAGES_STATE_KEY = makeStateKey<PageRegistryDto[]>('pages_state_key');

function updateConfig(router: Router, pages: PageRegistryDto[]) {
  let staticRoutes = router.config;

  const dummyRouteIdx = staticRoutes.findIndex(route => route.path === DUMMY_PATH);
  const [dummyRoute] = staticRoutes.splice(dummyRouteIdx, 1);

  const blogRouteIdx = staticRoutes.findIndex(route => route.path === BLOG_PATH);

  const dynamicRoutes: Routes = [];
  pages.forEach(page => {
    const isBlogPage = page.type === PageTypeEnum.BlogPost || page.type === PageTypeEnum.BlogCategory;
    const path = page.slug;
    const loadChildren = dummyRoute.children.find(route => route.path === page.type).loadChildren;

    const route: Route = {
      path,
      loadChildren,
      data: {
        slug: page.slug
      }
    };

    if (isBlogPage) {
      staticRoutes[blogRouteIdx].children.push(route);
    } else {
      dynamicRoutes.push(route);
    }
  });

  const [notFoundRoute] = staticRoutes.splice(staticRoutes.length - 1, 1);

  const routes = [...staticRoutes, ...dynamicRoutes];

  const ruRoute: Route = {
    path: '',
    children: routes
  };

  const ukRoute: Route = {
    path: 'ua',
    children: routes
  };

  router.resetConfig([ruRoute, ukRoute, notFoundRoute]);
}

export function routesResolver(http: HttpClient, router: Router, injector: Injector, state: TransferState, platformId: any) {
  return () => {
    if (isPlatformServer(platformId)) {
      try {
        const pagesFromServer = injector.get(PAGES_TOKEN); // token is present only in Server
        state.set(PAGES_STATE_KEY, pagesFromServer);
        updateConfig(router, pagesFromServer);
        return;
      } catch (e) {
        console.error(`Error in routesResolver:`, e);
      }
    }

    const pagesFromTransferState = state.get<PageRegistryDto[]>(PAGES_STATE_KEY, []);
    if (pagesFromTransferState.length > 0) {
      updateConfig(router, pagesFromTransferState);
      return;
    }

    return http.get<ResponseDto<PageRegistryDto[]>>(`${API_HOST}/api/v1/pages/`)
      .pipe(
        tap(response => updateConfig(router, response.data))
      )
      .toPromise();
  }
}
