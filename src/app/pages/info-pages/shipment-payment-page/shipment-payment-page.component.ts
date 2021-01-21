import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'shipment-payment-page',
  templateUrl: './shipment-payment-page.component.html',
  styleUrls: ['./shipment-payment-page.component.scss']
})
export class ShipmentPaymentPageComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    const title = 'shipment_payment_page.meta_title';
    const description = 'shipment_payment_page.meta_description';
    this.languageService.getTranslation([title, description]).subscribe(texts => {
      this.headService.setMeta({
        title: texts[title],
        description: texts[description],
        keywords: ''
      });
    });
  }
}
