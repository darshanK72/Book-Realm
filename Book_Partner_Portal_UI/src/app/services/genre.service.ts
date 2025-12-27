import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genre {
  id: string;
  name: string;
  description: string;
  subgenres: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:5239/api/genres';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  getGenre(id: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}/${id}`);
  }

  createGenre(genre: Partial<Genre>): Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  updateGenre(id: string, genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}/${id}`, genre);
  }

  deleteGenre(id: string): Observable<Genre> {
    return this.http.delete<Genre>(`${this.apiUrl}/${id}`);
  }
}
