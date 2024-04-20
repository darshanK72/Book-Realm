import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { startLoading, stopLoading } from './shared.actions';
import { map, switchMap, tap } from 'rxjs';
import {
  continueWithGoogle,
  signIn,
  signInFailure,
  signInSuccess,
  signInWithGoogleFailure,
  signInWithGoogleSuccess,
  signOut,
  signUpFailure,
  signUpSuccess,
  signUpWithGoogleFailure,
  signUpWithGoogleSuccess,
  singnUp,
} from '../auth/auth.actions';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { getHeroSectionsFailure, getHeroSectionsSuccess } from '../home/home.actions';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private toast: NgToastService,
    private router: Router
  ) {}
  handleSpinnerStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(singnUp, signIn, continueWithGoogle),
      map(() => startLoading())
    )
  );

  handleSpinnerStop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        signUpSuccess,
        signUpFailure,
        signInSuccess,
        signInFailure,
        signUpWithGoogleSuccess,
        signUpWithGoogleFailure,
        signInWithGoogleSuccess,
        signInWithGoogleFailure,
        getHeroSectionsSuccess,
        getHeroSectionsFailure
      ),
      map(() => stopLoading())
    )
  );

  handleSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          signUpSuccess,
          signInSuccess,
          signUpWithGoogleSuccess,
          signInWithGoogleSuccess
        ),
        tap((action) =>
          this.toast.success({
            detail: 'SUCCESS',
            duration:3000,
            summary: action.payload.success,
            position: 'botomCenter',
          })
        ),
        tap(() => {
          const returnUrl = this.extractReturnUrl();
          this.router.navigateByUrl(returnUrl || '/home');
        })
      ),
    { dispatch: false }
  );

  handleFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          signUpFailure,
          signInFailure,
          signUpWithGoogleFailure,
          signInWithGoogleFailure
        ),
        tap((action) =>
          this.toast.error({
            detail: 'ERROR',
            duration:3000,
            summary: action.payload.error,
            position: 'botomCenter',
          })
        )
      ),
    { dispatch: false }
  );

  navigateToHomeAfterSignOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        tap(() =>
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'User Signed Out Successfully',
            duration: 3000,
            position: 'botomCenter',
          })
        ),
        tap(() => {
          const returnUrl = this.extractReturnUrl();
          this.router.navigateByUrl(returnUrl || '/home');
        })
      ),
    { dispatch: false }
  );

  private extractReturnUrl(): string | null {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    return currentUrlTree.queryParams['returnUrl'] || null;
  }
}
