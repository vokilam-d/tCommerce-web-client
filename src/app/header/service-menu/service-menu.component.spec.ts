import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientServiceMenuComponent } from './service-menu.component';

describe('TopMenuComponent', () => {
  let component: WebClientServiceMenuComponent;
  let fixture: ComponentFixture<WebClientServiceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientServiceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientServiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
