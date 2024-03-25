import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subgenre } from 'src/app/Models/subgenre';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubgenreService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  get6SubgenresRandom():Observable<Subgenre[]>{
    return this.http.get<Subgenre[]>(`${this.baseUrl}/subgenres/random`);
  }

  getSubgenresByGenre(genreId : string):Observable<Subgenre[]>{
    return this.http.get<Subgenre[]>(`${this.baseUrl}/subgenres/genre/${genreId}`);
  }

  getSubgenreById(id:number):Observable<Subgenre>{
    return this.http.get<Subgenre>(`${this.baseUrl}/subgenre/${id}`);
  }
}
