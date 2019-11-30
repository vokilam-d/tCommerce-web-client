import { TestBed } from '@angular/core/testing';

import { WebClientCategoryService } from './category.service';

describe('WebClientCategoryService', () => {
  let service: WebClientCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebClientCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
