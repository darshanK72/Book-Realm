import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, forkJoin, map, switchMap, take } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { loadBooksBySubgenre } from 'src/app/Store/book/book.actions';
import {
  selectBooks,
  selectBooksBySubgenreId,
} from 'src/app/Store/book/book.selectors';
import { selectGenres } from 'src/app/Store/genre/genre.selectors';
import { load6SubgenresRandom } from 'src/app/Store/subgenre/subgenre.actions';
import { select6SubgenresRandom } from 'src/app/Store/subgenre/subgenre.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // books$ = this.store.pipe(select(selectBooks));
  // genres$ = this.store.pipe(select(selectGenres));
  subgenres$ = this.store.pipe(select(select6SubgenresRandom));

  // genre1books!: Book[];
  // genre1Title!: string;
  // genre2books!: Book[];
  // genre2Title!: string;
  // genre3books!: Book[];
  // genre3Title!: string;
  // genre4books!: Book[];
  // genre4Title!: string;
  // genre5books!: Book[];
  // genre5Title!: string;
  // genre6books!: Book[];
  // genre6Title!: string;

  genereTitles: string[] = [];
  genereBooks: Book[][] = [];

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private scrollService: ScrollService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(load6SubgenresRandom());

    this.subgenres$.subscribe((subgenres) => {
      console.log(subgenres);
      subgenres.forEach((sg) => {
        this.store.dispatch(
          loadBooksBySubgenre({ payload: { subgenreId: sg.id } })
        );
        this.store
          .pipe(select(selectBooksBySubgenreId(sg.id)))
          .subscribe((books) => {
           if(books.length > 0 && !this.genereTitles.includes(sg.name)){
             this.genereBooks.push(books);
             this.genereTitles.push(sg.name);
           }
            console.log(this.genereTitles);
          });
      });
    });
  }
}
