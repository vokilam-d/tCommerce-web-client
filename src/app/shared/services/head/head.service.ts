import { Injectable } from '@angular/core';
import { MetaTagsDto } from '../../dtos/meta-tags.dto';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private title: Title,
              private meta: Meta) {
  }

  setMeta(metaTags: MetaTagsDto, ogTags?: IOgTags) {
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
  }
}
