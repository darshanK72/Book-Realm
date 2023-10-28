import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './Store/app.state';
import { getBooks } from './Store/book/book.actions';
import { getGenres } from './Store/genre/genre.actions';
import { getSubgenres } from './Store/subgenre/subgenre.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  title = 'Book_Realm_UI';
  showSidebar: boolean = false;

  constructor(private store:Store<AppState>){}

  ngOnInit(){
    this.store.dispatch(getBooks());
    this.store.dispatch(getGenres());
    this.store.dispatch(getSubgenres());

  }

  sidebarToggle(event: any) {
    this.showSidebar = event;
  }
}
