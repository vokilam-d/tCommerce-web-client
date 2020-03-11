import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewModalComponent } from './add-review-modal.component';

describe('AddReviewModalComponent', () => {
  let component: AddReviewModalComponent;
  let fixture: ComponentFixture<AddReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
