import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSellProductsComponent } from './cross-sell-products.component';

describe('CrossSellProductsComponent', () => {
  let component: CrossSellProductsComponent;
  let fixture: ComponentFixture<CrossSellProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossSellProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSellProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
