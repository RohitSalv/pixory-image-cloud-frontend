import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RetrievalService {

  private apiUrl = `${environment.filesApiUrl}/me`;

  constructor(private http: HttpClient) { }

  getAllFiles() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteFile(id: number) {
    return this.http.delete(`${environment.filesApiUrl}/delete/${id}`);
  }
}

