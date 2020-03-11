import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGalleryComponent } from './product-gallery.component';

describe('MediaGalleryComponent', () => {
  let component: ProductGalleryComponent;
  let fixture: ComponentFixture<ProductGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
