import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output('search') searchEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search() {
    this.searchEmitter.emit('search event!');
  }

}
