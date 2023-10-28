import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../Models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  baseUrl:string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAllGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.baseUrl}/genre`);
  }

  getGenreById(id:number):Observable<Genre>{
    return this.http.get<Genre>(`${this.baseUrl}/genre/${id}`);
  }
}
