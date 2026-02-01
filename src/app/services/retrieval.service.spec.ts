import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RetrievalService } from './retrieval.service';

describe('RetrievalService', () => {
  let service: RetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
