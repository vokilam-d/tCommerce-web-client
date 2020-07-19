import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'repayments',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss']
})
export class RepaymentsComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    this.headService.setMeta({
      title: 'Возврат и обмен товара Клондайк интернет-магазин товаров для творчества',
      description: 'Возврат и обмен неиспользованного товара с целой упаковкой, бракованного товара возможны в течение 14 дней с момента получения посылки на Новой Почте. Оплата пересылок при обмене товара который не подошёл оплачивается покупателем. Оплата пересылок при обмене бракованного товара (брак должен подтвердить менеджер) оплачивается интернет-магазином. ',
      keywords: ''
    });
  }
}
