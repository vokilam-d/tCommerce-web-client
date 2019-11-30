import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientNotFoundComponent } from './not-found.component';

describe('WebClientNotFoundComponent', () => {
  let component: WebClientNotFoundComponent;
  let fixture: ComponentFixture<WebClientNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
