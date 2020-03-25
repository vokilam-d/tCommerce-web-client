import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrdersComponent } from './account-orders.component';

describe('AccountOrdersComponent', () => {
  let component: AccountOrdersComponent;
  let fixture: ComponentFixture<AccountOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
