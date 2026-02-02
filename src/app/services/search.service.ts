import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = `${environment.filesApiUrl}/search`; // Base URL for the search endpoint

  constructor(private http: HttpClient, private authService: AuthService) { }

  searchFiles(
    query: string,
    page: number = 0,
    size: number = 20,
    sort: string = 'id,asc'
  ): Observable<any> {
    let params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    const headers = this.authService.getAuthHeaders(); // Assuming getAuthHeaders returns HttpHeaders with Authorization

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
