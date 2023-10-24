import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  books!:Book[];
  genre1books!:Book[];
  genre2books!:Book[];
  genre3books!:Book[];
  genre4books!:Book[];
  genre5books!:Book[];
  genre6books!:Book[];
 
  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Book[]>(' http://localhost:3000/book')
      .subscribe((data) => {
        this.genre1books = data.filter(book => book.subgenreId == 1).splice(7);
        this.genre2books = data.filter(book => book.subgenreId == 2).splice(7);
        this.genre3books = data.filter(book => book.subgenreId == 3).splice(7);
        this.genre4books = data.filter(book => book.subgenreId == 4).splice(7);
        this.genre5books = data.filter(book => book.subgenreId == 5).splice(7);
        this.genre6books = data.filter(book => book.subgenreId == 6).splice(7);
        
      });
  }

}
