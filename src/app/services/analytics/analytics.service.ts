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

    const action = `Add to cart from ${source}`
    this.trackEvent('Add to cart', action, productName, productPrice);
    gtag('event', 'add_to_cart', {
      currency: 'UAH',
      items: [{
        item_id: sku,
        item_name: productName,
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
        item_id: sku,
        item_name: productName,
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

    this.trackEvent('Order success', 'Order success', 'Order success', totalCost);

    gtag('event', 'conversion', {
      'send_to': 'AW-930099759/az7OCJeAt8QBEK_kwLsD',
      'value': totalCost,
      'currency': 'UAH',
      'transaction_id': order.id
    });

    // Below is Artem suggested way of pushing 'purchase' event
    const products = [];
    for (const item of order.items) {
      const priceUSD = item.price ? item.price / 28.0 : 0.0;
      //todo: rework to use backend exchange rate later? USD??
      products.push({
        name: item.name,
        id: item.sku,
        price: priceUSD,
        quantity: item.qty
      })
    }
    const priceTotalUSD = order.prices?.totalCost ? order.prices.totalCost / 28.0 : 0.0;
    gtag({
      'ecommerce': {
        'purchase': {
          'actionField': {
            'id': order.id,
            'revenue': priceTotalUSD
          },
          'products': products
        }
      },
      'event': 'gtm-ecommerce'
    });

    //Maybe instead of the above 'purchase' event we may use only the below 'purchase' event. Lets's use both for now to test
    const purchasedItems = [];
    for (const item of order.items) {
      purchasedItems.push({
        item_id: item.sku,
        item_name: item.name,
        price: item.price,
        currency: 'UAH',
        quantity: item.qty
      })
    }
    gtag('event', 'purchase', {
      currency: 'UAH',
      items: purchasedItems,
      transaction_id: order.id,
      value: totalCost
    })

    const purchasedContents = [];
    for (const item of order.items) {
      purchasedContents.push({
        id: item.sku,
        quantity: item.qty
      })
    }
    fbq('track', 'Purchase', {
      value: totalCost,
      currency: 'UAH',
      contents: purchasedContents,
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
