import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewGalleryComponent } from './review-gallery.component';

describe('ReviewGalleryComponent', () => {
  let component: ReviewGalleryComponent;
  let fixture: ComponentFixture<ReviewGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
