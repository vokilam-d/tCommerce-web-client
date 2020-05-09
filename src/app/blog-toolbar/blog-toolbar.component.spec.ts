import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogToolbarComponent } from './blog-toolbar.component';

describe('BlogToolbarComponent', () => {
  let component: BlogToolbarComponent;
  let fixture: ComponentFixture<BlogToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
