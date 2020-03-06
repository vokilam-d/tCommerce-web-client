import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: any;
  items: any[];

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.fetchCategory();
  }

  private fetchCategory() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.categoryService.fetchCategory(slug).subscribe(
      response => {
        this.category = response.data;
        this.fetchCategoryItems();
      },
      error => console.warn(error)
    );
  }

  private fetchCategoryItems() {
    this.categoryService.fetchCategoryItems(this.category.slug).subscribe(
      response => {
        this.items = response.data;
      },
      error => console.warn(error)
    )
  }
}
