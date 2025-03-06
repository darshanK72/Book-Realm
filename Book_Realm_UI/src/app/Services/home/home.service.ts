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

  getHeroByIds(ids:string[]):Observable<Hero[]>{
    console.log(ids);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const requestData = JSON.stringify(ids);
    return this.http.post<Hero[]>(`${this.baseUrl}/home/heros`,requestData,httpOptions);
  }

}
