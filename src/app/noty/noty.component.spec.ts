import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotyComponent } from './noty.component';

describe('NotyComponent', () => {
  let component: NotyComponent;
  let fixture: ComponentFixture<NotyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
