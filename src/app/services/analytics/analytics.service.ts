import { Injectable } from '@angular/core';

declare const gtag: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  addToCart(productName: string, productCost: number, source: string) {
    const label = `From: ${source}`;
    this.trackEvent('Add to cart', 'Add to cart', label, productCost);
  }

  placeOrder(id: string, total: number) {
    gtag('event', 'conversion', {
      'send_to': 'AW-930099759/az7OCJeAt8QBEK_kwLsD',
      'value': total,
      'currency': 'UAH',
      'transaction_id': id
    });
  }

  private trackEvent(category: string, action: string, label: string, value?: number) {
    gtag('event', action, {
      'send_to': 'UA-71259154-2',
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
}
