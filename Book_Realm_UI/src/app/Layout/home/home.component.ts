import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { getBooks } from 'src/app/Store/book/book.actions';
import { selectBooks } from 'src/app/Store/book/book.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  books$ = this.store.pipe(select(selectBooks));

  genre1books!: Book[];
  genre1Title!: string;
  genre2books!: Book[];
  genre2Title!: string;
  genre3books!: Book[];
  genre3Title!: string;
  genre4books!: Book[];
  genre4Title!: string;
  genre5books!: Book[];
  genre5Title!: string;
  genre6books!: Book[];
  genre6Title!: string;

  baseUrl:string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private scrollService: ScrollService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
    this.books$.subscribe((data) => {
      this.genre1books = data.filter((book) => book.subgenreId == 16);
      this.http
        .get<Subgenre>(`${this.baseUrl}/subgenre/${16}`)
        .subscribe((subg) => (this.genre1Title = subg.description));
      this.genre2books = data.filter((book) => book.subgenreId == 12);
      this.http
        .get<Subgenre>(`${this.baseUrl}/subgenre/${12}`)
        .subscribe((subg) => (this.genre2Title = subg.description));
      this.genre3books = data.filter((book) => book.subgenreId == 3);
      this.http
        .get<Subgenre>(`${this.baseUrl}/subgenre/${3}`)
        .subscribe((subg) => (this.genre3Title = subg.description));
      this.genre4books = data.filter((book) => book.subgenreId == 4);
      this.http
        .get<Subgenre>(`${this.baseUrl}/subgenre/${4}`)
        .subscribe((subg) => (this.genre4Title = subg.description));
      this.genre5books = data.filter((book) => book.subgenreId == 5);
      this.http
        .get<Subgenre>(`${this.baseUrl}/subgenre/${5}`)
        .subscribe((subg) => (this.genre5Title = subg.description));
      this.genre6books = data.filter((book) => book.subgenreId == 6);
      this.http
        .get<Subgenre>(`${this.baseUrl}/subgenre/${6}`)
        .subscribe((subg) => (this.genre6Title = subg.description));
    });
  }
}
