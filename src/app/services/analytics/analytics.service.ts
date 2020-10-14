import { Injectable } from '@angular/core';

declare const gtag: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  addToCart(productName: string, productPrice: number, source: string) {
    const action = `Add to cart from ${source}`
    this.trackEvent('Add to cart', action, productName, productPrice);
  }

  removeFromoCart(productName: string, productPrice: number) {
    this.trackEvent('Remove from cart', 'Remove from cart', productName, productPrice);
  }

  showCart() {
    this.trackEvent('Show cart', 'Show cart', 'Show cart');
  }

  editOrder() {
    this.trackEvent('Edit order', 'Edit order', 'Edit order');
  }

  confirmOrder(totalCost: number) {
    this.trackEvent('Confirm order', 'Confirm order', 'Confirm order', totalCost);
  }

  orderSuccess(orderId: string, totalCost: number) {
    this.trackEvent('Order success', 'Order success', 'Order success', totalCost);

    gtag('event', 'conversion', {
      'send_to': 'AW-930099759/az7OCJeAt8QBEK_kwLsD',
      'value': totalCost,
      'currency': 'UAH',
      'transaction_id': orderId
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
