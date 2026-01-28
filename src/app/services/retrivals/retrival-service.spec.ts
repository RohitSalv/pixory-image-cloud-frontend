import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RetrivalService } from './retrival-service';

describe('RetrivalService', () => {
  let service: RetrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RetrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
