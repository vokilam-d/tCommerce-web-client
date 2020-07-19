import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    this.headService.setMeta({
      title: 'Контакты, интернет-магазин Клондайк',
      description: 'Контакты, интернет-магазин Клондайк',
      keywords: 'Контакты, интернет-магазин Клондайк'
    });
  }
}
