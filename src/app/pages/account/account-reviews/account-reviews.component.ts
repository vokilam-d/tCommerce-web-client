import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';

@Component({
  selector: 'account-reviews',
  templateUrl: './account-reviews.component.html',
  styleUrls: ['./account-reviews.component.scss']
})
export class AccountReviewsComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Мои отзывы', description: 'Мои отзывы' });
  }
}
