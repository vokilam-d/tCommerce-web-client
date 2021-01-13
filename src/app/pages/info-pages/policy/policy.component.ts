import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    const title = 'policy_page.meta_title';
    const description = 'policy_page.meta_description';
    this.languageService.getTranslation([title, description]).subscribe(texts => {
      this.headService.setMeta({
        title: texts[title],
        description: texts[description],
        keywords: ''
      });
    });
  }
}
