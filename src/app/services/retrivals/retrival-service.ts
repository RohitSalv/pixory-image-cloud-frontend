import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RetrivalService {

  private apiUrl = 'http://localhost:8092/api/v1/files/all';

  constructor(private http: HttpClient) { }

  getAllFiles() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteFile(id: number) {
    return this.http.delete(`http://localhost:8092/api/v1/files/delete/${id}`);
  }
}
