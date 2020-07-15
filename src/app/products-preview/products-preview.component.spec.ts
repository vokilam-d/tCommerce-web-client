import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPreviewComponent } from './products-preview.component';

describe('RelatedProductsComponent', () => {
  let component: ProductsPreviewComponent;
  let fixture: ComponentFixture<ProductsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
