import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { selectIsLoggedIn } from 'src/app/Store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(selectIsLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          const returnUrl = state.url;
          return this.router.createUrlTree(['/signin'], { queryParams: { returnUrl } });
        }
      })
    );
  }
}
