import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss', '../blog-page.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.languageService.getTranslation('global.blog').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
