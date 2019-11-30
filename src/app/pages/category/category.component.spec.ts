import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientCategoryComponent } from './category.component';

describe('WebClientCategoryComponent', () => {
  let component: WebClientCategoryComponent;
  let fixture: ComponentFixture<WebClientCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
