import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.languageService.getTranslation('global.my_wishes').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
