import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniAccountComponent } from './mini-account.component';

describe('MiniAccountComponent', () => {
  let component: MiniAccountComponent;
  let fixture: ComponentFixture<MiniAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
