import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'account-reviews',
  templateUrl: './account-reviews.component.html',
  styleUrls: ['./account-reviews.component.scss']
})
export class AccountReviewsComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.languageService.getTranslation('account_reviews.my_reviews').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
