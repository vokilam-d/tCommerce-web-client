import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMenuComponent } from './service-menu.component';

describe('TopMenuComponent', () => {
  let component: ServiceMenuComponent;
  let fixture: ComponentFixture<ServiceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
