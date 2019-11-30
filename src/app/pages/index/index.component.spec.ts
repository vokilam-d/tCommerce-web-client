import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientIndexComponent } from './index.component';

describe('WebClientIndexComponent', () => {
  let component: WebClientIndexComponent;
  let fixture: ComponentFixture<WebClientIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
