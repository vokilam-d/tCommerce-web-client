import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';

@Component({
  selector: 'pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.scss']
})
export class PgComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta() {
    this.headService.setMeta({
      title: 'Buy profession gilding tools, PG Group',
      description: 'Buy profession gilding tools, PG Group'
    });
  }
}
