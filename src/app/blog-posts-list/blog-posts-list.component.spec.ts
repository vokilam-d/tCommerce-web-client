import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsListComponent } from './blog-posts-list.component';

describe('BlogPostsListComponent', () => {
  let component: BlogPostsListComponent;
  let fixture: ComponentFixture<BlogPostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
