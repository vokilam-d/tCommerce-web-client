import { Inject, Injectable } from '@angular/core';
import { MetaTagsDto } from '../../shared/dtos/meta-tags.dto';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Language } from '../../shared/enums/language.enum';
import { UrlService } from '../url/url.service';

export interface IOgTags {
  type: 'product' | 'article';
  title: string;
  image?: string;
  description: string;
  url: string;
  site_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private title: Title,
    private meta: Meta,
    private urlService: UrlService
  ) { }

  setMeta(metaTags: MetaTagsDto, ogTags?: IOgTags) {
    // this.title.setTitle('STG | ' + metaTags.title || '');
    this.title.setTitle(metaTags.title || '');
    this.meta.updateTag({ name: 'description', content: metaTags.description });
    this.meta.updateTag({ name: 'keywords', content: metaTags.keywords || metaTags.title });

    if (ogTags) {
      this.meta.updateTag({ property: 'og:site_name', content: 'Klondike' });
      this.meta.updateTag({ property: 'og:type', content: ogTags.type });
      this.meta.updateTag({ property: 'og:title', content: ogTags.title });
      this.meta.updateTag({ property: 'og:description', content: ogTags.description });
      this.meta.updateTag({ property: 'og:url', content: ogTags.url });

      if (ogTags.image) {
        this.meta.updateTag({ property: 'og:image', content: ogTags.image });
      }
    }

    this.setHreflangLinks();
  }

  setHreflangLinks() {
    const languages = [Language.RU, Language.UK];
    languages.forEach(lang => {
      const link = this.document.head.querySelector<HTMLLinkElement>(`link[rel='alternate'][hreflang='${lang}']`)
        || this.document.createElement('link');

      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = this.urlService.buildCurrentUrlWithLang(lang);

      const firstHeadChild = this.document.head.firstChild;
      this.document.head.insertBefore(link, firstHeadChild);
    });
  }
}
