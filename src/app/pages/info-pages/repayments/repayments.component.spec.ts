import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentsComponent } from './repayments.component';

describe('RepaymentsComponent', () => {
  let component: RepaymentsComponent;
  let fixture: ComponentFixture<RepaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
