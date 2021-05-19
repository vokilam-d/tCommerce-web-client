import { TestBed } from '@angular/core/testing';

import { PreventScrollService } from './prevent-scroll.service';

describe('PreventScrollService', () => {
  let service: PreventScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
