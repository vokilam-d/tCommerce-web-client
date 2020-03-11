import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from './breadcrumbs.interface';
import { JsonLdService } from '../shared/services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  jsonLd: SafeHtml;
  @Input() breadcrumbs: IBreadcrumb[];
  @Input() currentLink: string;

  constructor(private jsonLdService: JsonLdService) { }

  ngOnInit() {
    this.setJsonLd();
  }

  private setJsonLd() {
    const jsonLd: any = {
      '@context': "http://schema.org",
      '@type': "BreadcrumbList",
      'itemListElement': this.breadcrumbs.map((breadcrumb, index) => ({
        '@type': "ListItem",
        'item': {
          '@id': `https://klondike.com.ua/${breadcrumb.link || this.currentLink}`,
          'name': breadcrumb.title
        },
        'position': index
      }))
    };

    this.jsonLd = this.jsonLdService.getSafeJsonLd(jsonLd);
  }
}
