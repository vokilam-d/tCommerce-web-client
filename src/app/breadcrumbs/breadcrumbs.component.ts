import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBreadcrumb } from './breadcrumbs.interface';
import { JsonLdService } from '../shared/services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnChanges {

  jsonLd: SafeHtml;
  @Input() breadcrumbs: IBreadcrumb[];

  constructor(private jsonLdService: JsonLdService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.breadcrumbs && changes.breadcrumbs.currentValue) {
      this.setJsonLd();
    }
  }

  private setJsonLd() {
    const jsonLd: any = {
      '@context': "http://schema.org",
      '@type': "BreadcrumbList",
      'itemListElement': this.breadcrumbs.map((breadcrumb, index) => ({
        '@type': "ListItem",
        'item': {
          '@id': `https://klondike.com.ua/${breadcrumb.link}`,
          'name': breadcrumb.title
        },
        'position': index
      }))
    };

    this.jsonLd = this.jsonLdService.getSafeJsonLd(jsonLd);
  }
}
