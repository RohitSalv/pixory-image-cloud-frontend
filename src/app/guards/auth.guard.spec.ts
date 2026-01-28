import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => false,
          },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const canActivate = guard.canActivate({} as any, {} as any);
    expect(canActivate).toBe(true);
  });

  it('should redirect to login if user is not authenticated', () => {
    const parseUrlSpy = spyOn(router, 'parseUrl').and.callThrough();
    const canActivate = guard.canActivate({} as any, {} as any);
    expect(parseUrlSpy).toHaveBeenCalledWith('/login');
  });
});
