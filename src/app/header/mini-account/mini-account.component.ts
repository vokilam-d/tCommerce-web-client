import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mini-account',
  templateUrl: './mini-account.component.html',
  styleUrls: ['./mini-account.component.scss']
})
export class MiniAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    console.log('toggle account!');
  }
}
