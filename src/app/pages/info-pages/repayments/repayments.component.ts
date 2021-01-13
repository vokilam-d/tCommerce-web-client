import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'repayments',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss']
})
export class RepaymentsComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    const title = 'repayments_page.meta_title';
    const description = 'repayments_page.meta_description';
    this.languageService.getTranslation([title, description]).subscribe(texts => {
      this.headService.setMeta({
        title: texts[title],
        description: texts[description],
        keywords: ''
      });
    });
  }
}
