import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 401) {
          // Skip 401 to let the component (Login) or AuthInterceptor handle it.
          return throwError(() => error);
        }

        // Improve error message extraction
        if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.error) { // Sometimes nested like { error: "Description" }
          errorMessage = error.error.error;
        } else {
          // Fallback for status codes
          if (error.status === 403) {
            errorMessage = 'Access Denied: You do not have permission to perform this action.';
          } else if (error.status === 404) {
            errorMessage = 'Resource not found.';
          } else if (error.status === 500) {
            errorMessage = 'Internal Server Error. Please try again later.';
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
      }

      toastService.error(errorMessage);
      return throwError(() => error);
    })
  );
};
