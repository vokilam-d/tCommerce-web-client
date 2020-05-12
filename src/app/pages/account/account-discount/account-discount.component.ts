import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';

@Component({
  selector: 'account-discount',
  templateUrl: './account-discount.component.html',
  styleUrls: ['./account-discount.component.scss']
})
export class AccountDiscountComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Мои накопительные скидки', description: 'Мои накопительные скидки' });
  }
}
