import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedCategoriesComponent } from './linked-categories.component';

describe('LinkedCategoriesComponent', () => {
  let component: LinkedCategoriesComponent;
  let fixture: ComponentFixture<LinkedCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
