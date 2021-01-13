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
    this.languageService.getTranslation(['global.privacy_policy']).subscribe(text => {
      this.headService.setMeta({
        title: text['global.privacy_policy'],
        description: 'Политика конфиденциальности интернет-магазина Клондайк',
        keywords: ''
      });
    });
  }
}
