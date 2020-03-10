import { TestBed } from '@angular/core/testing';

import { ProductReviewService } from './product-review.service';

describe('ProductReviewService', () => {
  let service: ProductReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
