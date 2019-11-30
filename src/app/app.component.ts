import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class WebClientAppComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(next => {
      if (next instanceof RouteConfigLoadEnd) {
        this.router.resetConfig(this.router.config.map(route => {
          delete route['_loadedConfig'];
          return route;
        }));
      }
    });

  }
}
