import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JsonLdService } from '../../../services/json-ld/json-ld.service';
import { BlogPostDto } from '../../../shared/dtos/blog-post.dto';
import { BlogService } from '../../../services/blog/blog.service';
import { HeadService, IOgTags } from '../../../services/head/head.service';
import { IBreadcrumb } from '../../../breadcrumbs/breadcrumbs.interface';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { EMediaVariant } from '../../../shared/enums/media-variant.enum';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss', '../blog-page.scss']
})
export class BlogPostComponent implements OnInit {

  jsonLd: SafeHtml;
  breadcrumbs: IBreadcrumb[];
  post: BlogPostDto;
  error: string;
  isLoading: boolean = false;
  mediaVariants = EMediaVariant;
  contentHtml: SafeHtml;

  constructor(
    private jsonLdService: JsonLdService,
    private route: ActivatedRoute,
    private headService: HeadService,
    private domSanitizer: DomSanitizer,
    private blogService: BlogService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost() {
    const slug = this.route.snapshot.data.slug;

    this.isLoading = true;
    this.blogService.getPost(slug)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.post = response.data;
          this.contentHtml = this.domSanitizer.bypassSecurityTrustHtml(this.post.content);
          this.setBreadcrumbs();
          this.setMeta();
          this.setJsonLd();
        },
        error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }

  private setBreadcrumbs() {
    this.languageService.getTranslation('global.blog').subscribe(text => {
      this.breadcrumbs = [
        { title: text, link: 'blog' },
        { title: this.post.category.name, link: `blog/${this.post.category.slug}` },
        { title: this.post.name, link: `blog/${this.post.slug}` },
      ];
    });
  }

  private setMeta() {
    const ogTags: IOgTags = {
      type: 'article',
      url: `https://klondike.com.ua/blog/${this.post.slug}`,
      description: this.post.metaTags.description,
      title: this.post.metaTags.title
    };
    if (this.post.medias[0]) {
      ogTags.image = `https://klondike.com.ua${this.post.medias[0].variantsUrls.original}`;
    }

    this.headService.setMeta(this.post.metaTags, ogTags);
  }

  private setJsonLd() {
    this.jsonLd = this.jsonLdService.getSafeJsonLd({
      "@context":"http://schema.org",
      "@type":"BlogPosting",
      "@id": `https://klondike.com.ua/blog/${this.post.slug}`,
      "headline": this.post.name,
      "description": this.post.content,
      "datePublished": this.post.publishedAt,
      "dateModified": this.post.updatedAt,
      "mainEntityOfPage": "https://klondike.com.ua/blog/",
      "image": this.post.medias.map(media => ({
        "@type": "ImageObject",
        "url": `https://klondike.com.ua${media.variantsUrls.original}`
      }))
    });
  }
}
