import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    this.languageService.getTranslation('contacts_page.meta_title').subscribe(text => {
      this.headService.setMeta({
        title: text,
        description: text,
        keywords: text
      });
    });
  }
}
