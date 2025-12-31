import { TestBed } from '@angular/core/testing';

import { RetrivalService } from './retrival-service';

describe('RetrivalService', () => {
  let service: RetrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
