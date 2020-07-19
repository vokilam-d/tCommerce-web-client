import { TestBed } from '@angular/core/testing';

import { JsonLdService } from './json-ld.service';

describe('JsonLdService', () => {
  let service: JsonLdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonLdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
