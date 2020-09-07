import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatedProductsComponent } from './aggregated-products.component';

describe('AggregatedProductsComponent', () => {
  let component: AggregatedProductsComponent;
  let fixture: ComponentFixture<AggregatedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
