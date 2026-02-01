import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';

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

    // Clear storage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store tokens', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const mockResponse = { accessToken: 'access-token-123', refreshToken: 'refresh-token-456' };

    service.login(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.getToken()).toBe('access-token-123');
      expect(localStorage.getItem('accessToken')).toBe('access-token-123');
      expect(localStorage.getItem('refreshToken')).toBe('refresh-token-456');
    });

    const req = httpMock.expectOne(`${environment.authApiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register and store tokens', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const mockResponse = { accessToken: 'access-token-new', refreshToken: 'refresh-token-new' };

    service.register(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.getToken()).toBe('access-token-new');
    });

    const req = httpMock.expectOne(`${environment.authApiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should refresh token', () => {
    localStorage.setItem('refreshToken', 'old-refresh-token');
    // Pre-set a dummy token in service to test update

    const mockResponse = { accessToken: 'new-access-token', refreshToken: 'new-refresh-token' };

    service.refreshToken().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.getToken()).toBe('new-access-token');
      expect(localStorage.getItem('refreshToken')).toBe('new-refresh-token');
    });

    const req = httpMock.expectOne(`${environment.authApiUrl}/refresh-token`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ refreshToken: 'old-refresh-token' });
    req.flush(mockResponse);
  });

  it('should send forgot password email', () => {
    const email = 'forgot@test.com';

    service.forgotPassword(email).subscribe();

    const req = httpMock.expectOne(`${environment.authApiUrl}/forgot-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });
    req.flush(null);
  });

  it('should reset password', () => {
    const token = 'reset-token';
    const newPassword = 'new-password';

    service.resetPassword(token, newPassword).subscribe();

    const req = httpMock.expectOne(`${environment.authApiUrl}/reset-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token, newPassword });
    req.flush(null);
  });
});
