import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getBooksByIds(ids:string[]):Observable<Book[]>{
      console.log(ids);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const requestData = JSON.stringify(ids);
      return this.http.post<Book[]>(`${this.baseUrl}/home/books`,requestData,httpOptions);
  }
  
  getBooksBySubgenre(subgenreId:string){
    console.log(subgenreId);
    return this.http.get<Book[]>(`${this.baseUrl}/books/subgenre/${subgenreId}`);
  }
}
