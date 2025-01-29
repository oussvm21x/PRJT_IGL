import { TestBed } from '@angular/core/testing';

import { SoinsService } from './soins.service';

describe('SoinsService', () => {
  let service: SoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
