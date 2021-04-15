import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactInfoComponent } from './customer-contact-info.component';

describe('CustomerContactInfoComponent', () => {
  let component: CustomerContactInfoComponent;
  let fixture: ComponentFixture<CustomerContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContactInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
