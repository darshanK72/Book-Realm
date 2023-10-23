import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';

@Component({
  selector: 'app-subgenre',
  templateUrl: './subgenre.component.html',
  styleUrls: ['./subgenre.component.css'],
})
export class SubgenreComponent implements OnInit {

  books!:Book[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Book[]>(' http://localhost:3000/book')
      .subscribe((data) => {
        this.books = data;
        console.log(data);
      });
  }
}
