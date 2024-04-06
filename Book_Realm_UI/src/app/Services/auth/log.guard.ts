import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { selectIsLoggedIn } from 'src/app/Store/auth/auth.selectors';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {
  constructor(private store:Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.pipe(
      select(selectIsLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
          return false;
        } else {
         return true;
        }
      })
    );
  }
}
