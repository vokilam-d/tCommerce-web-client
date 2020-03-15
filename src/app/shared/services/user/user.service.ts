import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: any;
  private name: string = '';
  private email: string = '';

  showUserLoginModal$ = new Subject();

  constructor(private router: Router) { }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  navigateToAccount() {
    if (this.token) {
      this.router.navigate(['/', 'account']);
    } else {
      this.showUserLoginModal$.next();
    }
  }
}
