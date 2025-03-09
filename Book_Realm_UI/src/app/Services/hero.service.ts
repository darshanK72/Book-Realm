import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../Models/hero';
import {environment} from 'src/environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }

  getHeroByIds(ids:string[]):Observable<Hero[]>{
    console.log(ids);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const requestData = JSON.stringify(ids);
    return this.http.post<Hero[]>(`${this.baseUrl}/heros/byIds`,requestData,httpOptions);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heros`, hero);
  }

  updateHero(id: string, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heros/${id}`, hero);
  }

  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.baseUrl}/heros/${id}`);
  }
}
