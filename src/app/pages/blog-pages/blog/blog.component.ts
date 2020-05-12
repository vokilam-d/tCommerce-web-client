import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss', '../blog-page.scss']
})
export class BlogComponent implements OnInit {

  constructor(private headService: HeadService) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Блог', description: 'Блог' });
  }
}
