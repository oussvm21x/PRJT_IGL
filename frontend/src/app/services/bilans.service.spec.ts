import { TestBed } from '@angular/core/testing';

import { BilansService } from './bilans.service';

describe('BilansService', () => {
  let service: BilansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
