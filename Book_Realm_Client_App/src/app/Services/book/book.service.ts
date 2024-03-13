import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/book`);
  }
}
