import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientProductComponent } from './product.component';

describe('WebClientProductComponent', () => {
  let component: WebClientProductComponent;
  let fixture: ComponentFixture<WebClientProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
