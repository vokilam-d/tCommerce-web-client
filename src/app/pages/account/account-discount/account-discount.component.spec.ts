import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDiscountComponent } from './account-discount.component';

describe('AccountDiscountComponent', () => {
  let component: AccountDiscountComponent;
  let fixture: ComponentFixture<AccountDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
