import { Injectable } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { Language } from '../../shared/enums/language.enum';

declare const gtag: any;
declare const fbq: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  addToCart(productName: string, productPrice: number, source: string) {
    const action = `Add to cart from ${source}`
    this.trackEvent('Add to cart', action, productName, productPrice);
  }

  removeFromCart(productName: string, productPrice: number) {
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

  trackOrderPlaced(order: OrderDto) {
    const totalCost = order.prices.totalCost;

    this.trackEvent('Order success', 'Order success', 'Order success', totalCost);

    gtag('event', 'conversion', {
      'send_to': 'AW-930099759/az7OCJeAt8QBEK_kwLsD',
      'value': totalCost,
      'currency': 'UAH',
      'transaction_id': order.id
    });

    const contents = [];
    for (const item of order.items) {
      contents.push({
        id: item.sku,
        quantity: item.qty
      })
    }

    fbq('track', 'Purchase', {
      value: totalCost,
      currency: 'UAH',
      contents,
      content_type: 'product'
    });
  }

  changeLang(langCode: Language) {
    this.trackEvent('Change lang', langCode, '');
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
