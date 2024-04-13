import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, forkJoin, map, switchMap, take } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { HomeSection } from 'src/app/Payloads/homeSection';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { loadBooksBySubgenre } from 'src/app/Store/book/book.actions';
import {
  selectBooks,
  selectBooksBySubgenreId,
} from 'src/app/Store/book/book.selectors';
import { selectGenres } from 'src/app/Store/genre/genre.selectors';
import { selectHeroSection } from 'src/app/Store/home/home.selectors';
import { load6SubgenresRandom } from 'src/app/Store/subgenre/subgenre.actions';
import { select6SubgenresRandom } from 'src/app/Store/subgenre/subgenre.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  heroSection!: HomeSection;
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private scrollService: ScrollService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectHeroSection).subscribe((data:any) => {
      this.heroSection = data?.heros
    });
  }
}
