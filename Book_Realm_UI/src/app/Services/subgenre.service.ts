import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subgenre } from '../Models/subgenre';

@Injectable({
  providedIn: 'root'
})
export class SubgenreService {

  baseUrl:string = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getAllSubgenres():Observable<Subgenre[]>{
    return this.http.get<Subgenre[]>(`${this.baseUrl}/subgenre`);
  }

  getSubgenreById(id:number):Observable<Subgenre>{
    return this.http.get<Subgenre>(`${this.baseUrl}/subgenre/${id}`);
  }
}
