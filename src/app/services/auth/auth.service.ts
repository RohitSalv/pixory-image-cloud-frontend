import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8092/api/auth';
  private token: string | null = null;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.token = localStorage.getItem('authToken');
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.setToken(response.token);
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

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.token = null;
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
  }
}
