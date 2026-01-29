import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8092/api/auth';
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
      this.token = localStorage.getItem('authToken');
      this._isAuthenticated.next(!!this.token);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this._isAuthenticated.next(true);
      })
    );
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  setToken(token: string) {
    this.token = token;
    if (this.isBrowser) {
      localStorage.setItem('authToken', token);
    }
    this._isAuthenticated.next(true);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      if (!this.token) {
        this.token = localStorage.getItem('authToken');
      }
      return this.token;
    }
    return null;
  }

  // New method to get HttpHeaders with Authorization token
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
      localStorage.removeItem('authToken');
    }
    this._isAuthenticated.next(false);
  }
}

