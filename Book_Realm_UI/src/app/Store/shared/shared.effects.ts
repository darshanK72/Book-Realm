import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { startLoading, stopLoading } from './shared.actions';
import { map, switchMap } from 'rxjs';
import { continueWithGoogle, signIn, signInFailure, signInSuccess, signInWithGoogleFailure, signInWithGoogleSuccess, signUpFailure, signUpSuccess, signUpWithGoogleFailure, signUpWithGoogleSuccess, singnUp } from '../auth/auth.actions';

@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions) {}
  handleSpinnerStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        singnUp,
        signIn,
        continueWithGoogle
      ),
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
        signInWithGoogleFailure
      ),
      map(() => stopLoading())
    )
  );
}
