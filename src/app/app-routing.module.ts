import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { dynamicModuleResolver } from './functions/dynamic-module-resolver.function';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    matcher: (segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult => {
      const path = segments.map(s => s.path).join('/');
      route.loadChildren = dynamicModuleResolver(path);

      return {
        consumed: segments,
        posParams: {
          slug: segments[0]
        }
      }
    },
    loadChildren: dynamicModuleResolver(),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
