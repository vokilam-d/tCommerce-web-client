import { Injectable } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { Language } from '../../shared/enums/language.enum';
import { ProductDto } from '../../shared/dtos/product.dto';
import { DeviceService } from '../device-detector/device.service';

declare const gtag: any;
declare const fbq: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private deviceService: DeviceService) { }

  trackViewContent(product: ProductDto) {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }

  // todo Add 1.'ecomm_category' 2.serverside USD conversion 3. isSaleItem: false 4. same event for 'cart'!! and maybe ecomm_pagetype searchresults/category/purchase
    gtag('event', 'page_view', {
      send_to: 'AW-930099759',
      ecomm_pagetype: 'product',
      ecomm_prodid: product.sku,
      ecomm_totalvalue: product.price ? product.price / 28.0 : 1.0,
    });

    gtag('event', 'view_item', {
      items: [{
        id: product.sku,
        price: product.price,
        currency: 'UAH'
      }]
    });

    fbq('track', 'ViewContent', {
      content_ids: [product.sku],
      value: product.price,
      currency: 'UAH',
      content_type: 'product'
    });
  }

  addToCart(sku: string, productName: string, productPrice: number, source: string) {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }

    const action = `Add to cart from ${source}`;
    this.trackEvent('Add to cart', action, productName, productPrice);
    gtag('event', 'add_to_cart', {
      currency: 'UAH',
      items: [{
        id: sku,
        name: productName,
        price: productPrice,
        currency: 'UAH',
        quantity: 1
      }],
      value: productPrice
    });

    fbq('track', 'AddToCart', {
      content_ids: [sku],
      value: productPrice,
      currency: 'UAH',
      content_type: 'product'
    });
  }

  removeFromCart(sku: string, productName: string, productPrice: number, productQty: number) {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }

    this.trackEvent('Remove from cart', 'Remove from cart', productName, productPrice);
    const qty = productQty ? productQty : 1;
    gtag('event', 'remove_from_cart', {
      currency: 'UAH',
      items: [{
        id: sku,
        name: productName,
        price: productPrice,
        currency: 'UAH',
        quantity: qty
      }],
      value: productPrice * qty
    });
  }

  showCart() {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }
    this.trackEvent('Show cart', 'Show cart', 'Show cart');
  }

  editOrder() {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }
    this.trackEvent('Edit order', 'Edit order', 'Edit order');
  }

  confirmOrder(totalCost: number) {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }
    this.trackEvent('Confirm order', 'Confirm order', 'Confirm order', totalCost);
  }

  trackOrderPlaced(order: OrderDto) {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }

    const totalCost = order.prices.totalCost;

    gtag('event', 'conversion', {
      send_to: 'AW-930099759/az7OCJeAt8QBEK_kwLsD',
      value: totalCost,
      currency: 'UAH',
      transaction_id: order.id
    });

    gtag('event', 'purchase', {
      currency: 'UAH',
      items: order.items.map(item => {
        return {
          id: item.sku,
          name: item.name,
          price: item.price,
          currency: 'UAH',
          quantity: item.qty
        };
      }),
      transaction_id: order.id,
      value: totalCost
    });

    fbq('track', 'Purchase', {
      value: totalCost,
      currency: 'UAH',
      contents: order.items.map(item => {
        return {
          id: item.sku,
          quantity: item.qty
        };
      }),
      content_type: 'product'
    });
  }

  changeLang(langCode: Language) {
    if (!this.deviceService.isPlatformBrowser()) {
      return;
    }

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
