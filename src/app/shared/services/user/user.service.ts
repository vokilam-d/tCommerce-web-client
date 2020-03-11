import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private name: string = '';
  private email: string = '';

  constructor() { }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }
}
