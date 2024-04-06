import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './Store/app.state';
import { loadGenres } from './Store/genre/genre.actions';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from './Services/auth/auth.service';
import { continueWithGoogle } from './Store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Book_Realm_UI';
  showSidebar: boolean = false;

  constructor(
    private store: Store<AppState>,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      this.store.dispatch(continueWithGoogle({payload:{user}}));
    });
  }

  ngOnInit() {
    this.store.dispatch(loadGenres());
  }

  sidebarToggle(event: any) {
    this.showSidebar = event;
  }
}
