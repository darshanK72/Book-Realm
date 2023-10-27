import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  books!:Book[];
  genre1books!:Book[];
  genre1Title!:string;
  genre2books!:Book[];
  genre2Title!:string;
  genre3books!:Book[];
  genre3Title!:string;
  genre4books!:Book[];
  genre4Title!:string;
  genre5books!:Book[];
  genre5Title!:string;
  genre6books!:Book[];
  genre6Title!:string;
 
  constructor(private http:HttpClient,private scrollService:ScrollService) {}

  ngOnInit(): void {
    this.http
      .get<Book[]>('http://localhost:3000/book')
      .subscribe((data) => {
        this.genre1books = data.filter(book => book.subgenreId == 16);
        console.log(this.genre1books);
        this.http.get<Subgenre>(`http://localhost:3000/subgenre/${16}`).subscribe(subg => this.genre1Title = subg.description);
        this.genre2books = data.filter(book => book.subgenreId == 12);
        this.http.get<Subgenre>(`http://localhost:3000/subgenre/${12}`).subscribe(subg => this.genre2Title = subg.description);
        this.genre3books = data.filter(book => book.subgenreId == 3);
        this.http.get<Subgenre>(`http://localhost:3000/subgenre/${3}`).subscribe(subg => this.genre3Title = subg.description);
        this.genre4books = data.filter(book => book.subgenreId == 4);
        this.http.get<Subgenre>(`http://localhost:3000/subgenre/${4}`).subscribe(subg => this.genre4Title = subg.description);
        this.genre5books = data.filter(book => book.subgenreId == 5);
        this.http.get<Subgenre>(`http://localhost:3000/subgenre/${5}`).subscribe(subg => this.genre5Title = subg.description);
        this.genre6books = data.filter(book => book.subgenreId == 6);
        this.http.get<Subgenre>(`http://localhost:3000/subgenre/${6}`).subscribe(subg => this.genre6Title = subg.description);
        
      });
  }

}
