import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebClientHeaderComponent } from './header.component';

describe('WebClientHeaderComponent', () => {
  let component: WebClientHeaderComponent;
  let fixture: ComponentFixture<WebClientHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebClientHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebClientHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
