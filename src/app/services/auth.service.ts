import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, RefreshTokenRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.authApiUrl;
  private token: string | null = null;
  private isBrowser: boolean;
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.token = this.getTokenFromStorage();
      this._isAuthenticated.next(!!this.token);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials).pipe(
      tap((response: AuthResponse) => {
        if (response.accessToken && response.refreshToken) {
          this.setTokens(response.accessToken, response.refreshToken);
        }
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    const payload: RefreshTokenRequest = { refreshToken };
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, payload).pipe(
      tap((response: AuthResponse) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  forgotPassword(email: string): Observable<void> {
    const payload: ForgotPasswordRequest = { email };
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, payload);
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    const payload: ResetPasswordRequest = { token, newPassword };
    return this.http.post<void>(`${this.apiUrl}/reset-password`, payload);
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.token = accessToken;
    if (this.isBrowser) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.removeItem('authToken'); // Cleanup old token
    }
    this._isAuthenticated.next(true);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      if (!this.token) {
        this.token = this.getTokenFromStorage();
      }
      return this.token;
    }
    return null;
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem('accessToken') || localStorage.getItem('authToken');
  }

  getRefreshToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.token = null;
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authToken');
    }
    this._isAuthenticated.next(false);
  }
}
