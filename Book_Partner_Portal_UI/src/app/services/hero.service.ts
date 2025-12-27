import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hero {
  id: string;
  placeHolder: string;
  clickUrl: string;
  heroImages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = 'http://localhost:5239/api/heros';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  createHero(hero: Partial<Hero>): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero);
  }

  updateHero(id: string, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${id}`, hero);
  }

  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.apiUrl}/${id}`);
  }
}
