import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientCategoryItemComponent } from './category-item.component';

describe('WebClientCategoryItemComponent', () => {
  let component: WebClientCategoryItemComponent;
  let fixture: ComponentFixture<WebClientCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
