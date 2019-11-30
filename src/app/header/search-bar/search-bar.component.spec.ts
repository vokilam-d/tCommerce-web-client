import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientSearchBarComponent } from './search-bar.component';

describe('WebClientSearchBarComponent', () => {
  let component: WebClientSearchBarComponent;
  let fixture: ComponentFixture<WebClientSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
