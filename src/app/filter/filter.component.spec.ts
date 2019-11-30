import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientFilterComponent } from './filter.component';

describe('WebClientFilterComponent', () => {
  let component: WebClientFilterComponent;
  let fixture: ComponentFixture<WebClientFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
