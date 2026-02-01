import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Skip adding token/handling refresh for auth endpoints to avoid loops
  if (req.url.includes('/refresh-token') || req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  let authReq = req;
  if (token) {
    console.log('Main-Interceptor: Attaching token to', req.url);
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  } else {
    console.warn('Main-Interceptor: No token found for', req.url);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check for 401 Unauthorized OR 403 Forbidden (sometimes used for invalid tokens)
      if (error.status === 401 || error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((response: any) => {
            // Retry with new token
            const newToken = response.accessToken;
            const newReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken}`)
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            // Refresh failed -> Logout
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
