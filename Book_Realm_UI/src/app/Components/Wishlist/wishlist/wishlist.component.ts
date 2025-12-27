import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css'],
    standalone: false
})
export class WishlistComponent implements OnInit{

  books!:Book[];
  baseUrl:string = environment.baseUrl;
  
  constructor(private scrollService:ScrollService,private http:HttpClient){}

  ngOnInit(): void {
    this.http.get<Book[]>(`${this.baseUrl}/book`).subscribe(data => {
      this.books = data;
    })
  }
}
