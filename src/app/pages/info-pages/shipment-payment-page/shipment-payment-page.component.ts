import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'shipment-payment-page',
  templateUrl: './shipment-payment-page.component.html',
  styleUrls: ['./shipment-payment-page.component.scss']
})
export class ShipmentPaymentPageComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    this.headService.setMeta({
      title: 'Доставка и оплата Клондайк интернет-магазин товаров для творчества',
      description: 'Заказы, совершенные до 18-00, отправляются на следующий день, остальные заказы обрабатываются в течении 1-2 дней. В первую очередь обрабатываются заказы, оставленные на сайте через "корзину". Доставка товаров в отделение курьерской службы Новая Почта (в некоторых городах также возможна адресная доставка Новой Почтой).',
      keywords: ''
    });
  }
}
