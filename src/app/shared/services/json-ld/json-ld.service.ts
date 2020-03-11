import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
}
