import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedProductsComponent } from './recently-viewed-products.component';

describe('RecentlyViewedProductsComponent', () => {
  let component: RecentlyViewedProductsComponent;
  let fixture: ComponentFixture<RecentlyViewedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyViewedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyViewedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
