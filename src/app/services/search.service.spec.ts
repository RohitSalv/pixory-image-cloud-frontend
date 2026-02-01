import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { AuthService } from './auth.service';

describe('SearchService', () => {
  let service: SearchService;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      getAuthHeaders: jasmine.createSpy('getAuthHeaders')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SearchService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
