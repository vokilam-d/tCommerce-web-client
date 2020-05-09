import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss', '../blog-page.scss']
})
export class BlogPostComponent implements OnInit {
  breadcrumbs: any;

  constructor() { }

  ngOnInit(): void {
  }

}
