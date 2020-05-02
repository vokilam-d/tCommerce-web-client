import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReviewsComponent } from './store-reviews.component';

describe('StoreReviewsComponent', () => {
  let component: StoreReviewsComponent;
  let fixture: ComponentFixture<StoreReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
