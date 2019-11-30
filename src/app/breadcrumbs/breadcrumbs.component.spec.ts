import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientBreadcrumbsComponent } from './breadcrumbs.component';

describe('WebClientBreadcrumbsComponent', () => {
  let component: WebClientBreadcrumbsComponent;
  let fixture: ComponentFixture<WebClientBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
