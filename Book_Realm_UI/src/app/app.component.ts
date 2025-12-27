import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './Store/app.state';
import { loadGenres } from './Store/genre/genre.actions';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from './Services/auth/auth.service';
import { continueWithGoogle } from './Store/auth/auth.actions';
import { getHomeSections } from './Store/home/home.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'Book_Realm_UI';
  showSidebar: boolean = false;

  toast = {
    width: '300px',
  };

  constructor(
    private store: Store<AppState>,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      this.store.dispatch(continueWithGoogle({ payload: { user } }));
    });
  }
  
  ngOnInit() {
    this.authService.restoreAuthenticationState();
    this.store.dispatch(getHomeSections());
    this.store.dispatch(loadGenres());
  }

  removeActiveClass(element: Element): void {
    element.classList.remove('active');
  }

  sidebarToggle(event: any) {
    this.showSidebar = event;
  }
}
