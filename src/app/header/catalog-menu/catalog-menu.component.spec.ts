import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMenuComponent } from './catalog-menu.component';

describe('CatalogMenuComponent', () => {
  let component: CatalogMenuComponent;
  let fixture: ComponentFixture<CatalogMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
