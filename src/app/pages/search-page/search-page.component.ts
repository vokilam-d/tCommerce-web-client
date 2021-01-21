import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { ISelectedFilter } from '../../product-list/filter/selected-filter.interface';
import { ActivatedRoute } from '@angular/router';
import { HeadService } from '../../services/head/head.service';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { SEARCH_QUERY_PARAM } from '../../shared/constants';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent extends NgUnsubscribe implements OnInit {

  searchQuery: string;
  breadcrumbs: IBreadcrumb[];
  productListFilters: ISelectedFilter[];

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private headService: HeadService,
              private languageService: LanguageService
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(paramMap => {
      this.searchQuery = paramMap.get(SEARCH_QUERY_PARAM);

      this.setListFilters();
      this.setBreadcrumbs();
      this.setMeta();
    });
  }

  private setListFilters() {
    this.productListFilters = [{ id: SEARCH_QUERY_PARAM, valueId: this.searchQuery }];
  }

  private setBreadcrumbs() {
    this.languageService.getTranslation('search_page.search_result').subscribe(text => {
      this.breadcrumbs = [{ title: text }];
    });
  }

  private setMeta() {
    this.languageService.getTranslation('search_page.search_result').subscribe(text => {
      let title = text;

      if (this.searchQuery) {
        title += `: "${this.searchQuery}"`;
      }

      this.headService.setMeta({ title, description: '' });
    });
  }
}
