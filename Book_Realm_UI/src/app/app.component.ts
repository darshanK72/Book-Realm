import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './Store/app.state';
import { loadGenres } from './Store/genre/genre.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book_Realm_UI';
  showSidebar: boolean = false;

  constructor(private store:Store<AppState>){}

  ngOnInit(){
    this.store.dispatch(loadGenres());
  }

  sidebarToggle(event: any) {
    this.showSidebar = event;
  }
}
