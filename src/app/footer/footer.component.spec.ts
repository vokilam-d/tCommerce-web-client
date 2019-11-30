import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientFooterComponent } from './footer.component';

describe('WebClientFooterComponent', () => {
  let component: WebClientFooterComponent;
  let fixture: ComponentFixture<WebClientFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
