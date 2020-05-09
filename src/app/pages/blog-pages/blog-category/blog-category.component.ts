import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss', '../blog-page.scss']
})
export class BlogCategoryComponent implements OnInit {
  breadcrumbs: any;

  constructor() { }

  ngOnInit(): void {
  }

}
