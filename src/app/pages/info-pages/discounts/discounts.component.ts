import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    const title = 'discounts_page.meta_title';
    const description = 'discounts_page.meta_description';
    this.languageService.getTranslation([title, description]).subscribe(texts => {
      this.headService.setMeta({
        title: texts[title],
        description: texts[description],
        keywords: ''
      });
    });
  }
}
