import { Injectable } from '@angular/core';

declare const gtag: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  placeOrder(id: string, total: number) {
    gtag('event', 'conversion', {
      'send_to': 'AW-930099759/az7OCJeAt8QBEK_kwLsD',
      'value': total,
      'currency': 'UAH',
      'transaction_id': id
    });
  }
}
