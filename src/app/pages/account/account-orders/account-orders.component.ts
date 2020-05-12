import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';

@Component({
  selector: 'account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }


  private setMeta() {
    this.headService.setMeta({ title: 'Мои заказы', description: 'Мои заказы' });
  }
}
