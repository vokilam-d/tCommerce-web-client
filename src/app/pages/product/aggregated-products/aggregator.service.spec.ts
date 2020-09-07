import { TestBed } from '@angular/core/testing';

import { AggregatorService } from './aggregator.service';

describe('AggregatorService', () => {
  let service: AggregatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
