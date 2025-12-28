import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Subgenre {
  id: string;
  name: string;
  description: string;
  genreId: string;
}

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubgenreService {
  private apiUrl = `${environment.baseUrl}/subgenres`;

  constructor(private http: HttpClient) {}

  getSubgenres(): Observable<Subgenre[]> {
    return this.http.get<Subgenre[]>(this.apiUrl);
  }

  getSubgenre(id: string): Observable<Subgenre> {
    return this.http.get<Subgenre>(`${this.apiUrl}/${id}`);
  }

  createSubgenre(subgenre: Partial<Subgenre>): Observable<Subgenre> {
    return this.http.post<Subgenre>(this.apiUrl, subgenre);
  }

  updateSubgenre(id: string, subgenre: Subgenre): Observable<Subgenre> {
    return this.http.put<Subgenre>(`${this.apiUrl}/${id}`, subgenre);
  }

  deleteSubgenre(id: string): Observable<Subgenre> {
    return this.http.delete<Subgenre>(`${this.apiUrl}/${id}`);
  }
}
