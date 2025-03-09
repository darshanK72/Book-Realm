import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/Models/hero';
import { HomeSection } from 'src/app/Payloads/homeSection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllHomeSections():Observable<HomeSection[]>{
    return this.http.get<HomeSection[]>(`${this.baseUrl}/home`);
  }

}
