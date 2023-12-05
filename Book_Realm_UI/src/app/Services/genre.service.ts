import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../Models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.baseUrl}/genre`);
  }

  getGenreById(id:number):Observable<Genre>{
    return this.http.get<Genre>(`${this.baseUrl}/genre/${id}`);
  }
}
