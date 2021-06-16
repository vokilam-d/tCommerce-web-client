import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductDto } from '../../shared/dtos/product.dto';
import { ProductReviewDto } from '../../shared/dtos/product-review.dto';

@Injectable({
  providedIn: 'root'
})
export class JsonLdService {

  constructor(private sanitizer: DomSanitizer) { }

  getSafeJsonLd(jsonLD: { [key: string]: any }): SafeHtml {
    const json = JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>'); // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getSafeJsonLdForProduct(product: ProductDto, reviews: ProductReviewDto[]): SafeHtml {
    const jsonLd: any = {
      '@context': 'http://schema.org',
      '@type': 'Product',
      itemCondition: 'https://schema.org/NewCondition',
      description: product.fullDescription,
      name: product.name,
      offers: {
        '@type': 'Offer',
        availability: product.isInStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
        price: Math.round(product.price),
        priceCurrency: 'UAH',
        priceValidUntil: '2040-12-08',
        url: `https://klondike.com.ua/${product.slug}`
      },
      url: `https://klondike.com.ua/${product.slug}`
    };

    if (product.vendorCode) {
      jsonLd.sku = product.vendorCode;
      jsonLd.identifier = product.sku;
    } else {
      jsonLd.sku = product.sku;
    }

    if (product.gtin) {
      jsonLd.gtin = product.gtin;
    }

    const manufacturer = product.characteristics.find(c => c.code === 'manufacturer');
    if (manufacturer) {
      jsonLd.brand = manufacturer;
      jsonLd.manufacturer = manufacturer;
    }

    if (product.medias[0]) {
      jsonLd.image = `https://klondike.com.ua${product.medias[0].variantsUrls.original}`;
    }

    if (product.textReviewsCount > 0) {
      jsonLd.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: product.reviewsAvgRating,
        reviewCount: product.allReviewsCount
      };

      jsonLd.review = reviews.map(review => ({
        '@type': 'Review',
        author: review.name,
        datePublished: review.createdAt,
        description: review.text,
        "reviewRating": {
          "@type": "Rating",
          "bestRating": "5",
          "ratingValue": review.rating,
          "worstRating": "1"
        }
      }));
    }

    return this.getSafeJsonLd(jsonLd);
  }
}
