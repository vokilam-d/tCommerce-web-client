import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientSortingComponent } from './sorting.component';

describe('WebClientSortingComponent', () => {
  let component: WebClientSortingComponent;
  let fixture: ComponentFixture<WebClientSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
