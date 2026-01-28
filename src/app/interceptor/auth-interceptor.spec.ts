import { TestBed } from '@angular/core/testing';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';

describe('authInterceptor', () => {
  let authService: AuthService;

  const next: HttpHandlerFn = (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
    return of({} as HttpEvent<any>);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            getToken: () => null,
          },
        },
      ],
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => authInterceptor(req, next));
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header if token is present', () => {
    spyOn(authService, 'getToken').and.returnValue('test-token');
    const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => authInterceptor(req, next));
    const request = new HttpRequest<any>('GET', '/test');

    interceptor(request, (req) => {
      expect(req.headers.has('Authorization')).toBe(true);
      expect(req.headers.get('Authorization')).toBe('Bearer test-token');
      return of({} as HttpEvent<any>);
    });
  });

  it('should not add an Authorization header if token is not present', () => {
    const interceptor: HttpInterceptorFn = (req, next) =>
      TestBed.runInInjectionContext(() => authInterceptor(req, next));
    const request = new HttpRequest<any>('GET', '/test');

    interceptor(request, (req) => {
      expect(req.headers.has('Authorization')).toBe(false);
      return of({} as HttpEvent<any>);
    });
  });
});
