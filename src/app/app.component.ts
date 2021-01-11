import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { JsonLdService } from './services/json-ld/json-ld.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from './services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  localBusinessJsonLd: SafeHtml;
  webSiteJsonLd: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private jsonLdService: JsonLdService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.setLang();
    this.setJsonLd();
  }

  private setLang() {
    const routeLang = this.location.path().slice(1, 3);
    this.languageService.setCurrentLangByRouteLang(routeLang);
  }

  private setJsonLd() {
    const localJsonLd = {
      '@context': "http://schema.org",
      '@type': "LocalBusiness",
      'address': {
        '@type': "PostalAddress",
        'addressLocality': "Киев",
        'addressRegion': "",
        'postalCode': "3600",
        'streetAddress': "",
      },
      'description': `В интернет-магазин "Клондайк" Вы найдёте широкий ассортимент товаров для позолотчиков, художников, мастериц, иконописцев и просто любителей хенд-мейда.
  ↵У нас можно купить такие товары как:
        ↵- товары для золочения (поталь, зеркальная поталь, мордан, шеллак, подушка для золочения, лампензель)
    ↵- художественные краски (акриловые краски, масляные краски, акварельные краски, гуашь, темпера, пастель)
    ↵- патины, воски и пигменты (битум, жидкая поталь, акриловые патины, восковые патины, металлические и художественные пигменты)
    ↵- синтетические и натуральные кисти (беличьи кисти, колонок, лиса, щетина)
    ↵- художественные аксессуары и инструменты (футляры для кистей, мастихины) и многое другое
  ↵Мы рады подобрать нужный Вам материал и доставить его в срок!`,
      'email': "info@klondike.com.ua",
      'faxNumber': "(067) 88-11-962",
      'image': "https://klondike.com.ua/media/seller_image/default/logo.png",
      'name': "Klondike",
      'priceRange': "$$$",
      'telephone': "+38 (050) 26-27-214",
      'url': "https://klondike.com.ua/"
    };

    const websiteJsonLd = {
      '@context': "http://schema.org",
      '@type': "WebSite",
      'about': 'Интернет-магазин "Клондайк" Вы найдёте широкий ассортимент товаров для позолотчиков, художников, мастериц, иконописцев и просто любителей хенд-мейда.',
      'name': "Klondike",
      'url': "https://klondike.com.ua/"
    };

    this.localBusinessJsonLd = this.jsonLdService.getSafeJsonLd(localJsonLd);
    this.webSiteJsonLd = this.jsonLdService.getSafeJsonLd(websiteJsonLd);
  }
}
