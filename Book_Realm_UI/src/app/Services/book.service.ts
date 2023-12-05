import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../Models/book';

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
