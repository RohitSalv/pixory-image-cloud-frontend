import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const mockResponse = { token: 'test-token' };

    service.login(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.getToken()).toBe('test-token');
      expect(localStorage.getItem('authToken')).toBe('test-token');
    });

    const req = httpMock.expectOne('http://localhost:8092/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register a new user', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const mockResponse = { message: 'User registered successfully' };

    service.register(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8092/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear token', () => {
    localStorage.setItem('authToken', 'test-token');
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
