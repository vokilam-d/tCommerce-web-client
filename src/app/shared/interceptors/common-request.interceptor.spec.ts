import { TestBed } from '@angular/core/testing';

import { CommonRequestInterceptor } from './common-request.interceptor';

describe('CommonRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommonRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CommonRequestInterceptor = TestBed.inject(CommonRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
