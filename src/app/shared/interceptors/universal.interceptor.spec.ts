import { TestBed } from '@angular/core/testing';

import { UniversalInterceptor } from './universal.interceptor';

describe('UniversalInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UniversalInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UniversalInterceptor = TestBed.inject(UniversalInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
