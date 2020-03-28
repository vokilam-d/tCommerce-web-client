import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCustomerInfoComponent } from './account-customer-info.component';

describe('AccountCustomerInfoComponent', () => {
  let component: AccountCustomerInfoComponent;
  let fixture: ComponentFixture<AccountCustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
