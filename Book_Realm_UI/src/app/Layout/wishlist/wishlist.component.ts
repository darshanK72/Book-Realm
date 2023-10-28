import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  books!:Book[];
  
  constructor(private scrollService:ScrollService,private http:HttpClient){}

  ngOnInit(): void {
    this.http.get<Book[]>('http://localhost:3000/book').subscribe(data => {
      this.books = data;
    })
  }


}
