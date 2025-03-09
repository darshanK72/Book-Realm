import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/Models/genre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.baseUrl}/genres`);
  }

  getGenreById(id:number):Observable<Genre>{
    return this.http.get<Genre>(`${this.baseUrl}/genres/${id}`);
  }
}