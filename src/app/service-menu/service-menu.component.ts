import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent implements OnInit {

  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() storeReviewsCount: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  navigateToAccount() {
    this.userService.navigateToAccount();
  }

}
