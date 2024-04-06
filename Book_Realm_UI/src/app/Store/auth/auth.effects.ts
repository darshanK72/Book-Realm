import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';
import {
  continueWithGoogle,
  signIn,
  signInFailure,
  signInSuccess,
  signInWithGoogleFailure,
  signInWithGoogleSuccess,
  signUpFailure,
  signUpSuccess,
  signUpWithGoogleFailure,
  signUpWithGoogleSuccess,
  singnUp,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  singnIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      mergeMap((action) => {
        return this.authService.signIn(action.payload.signinRequest).pipe(
          map((data: any) =>
            signInSuccess({
              payload: {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                success: data.message,
              },
            })
          ),
          catchError(async (error) => signInFailure({ payload: { error:error.message } }))
        );
      })
    );
  });

  singnUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(singnUp),
      mergeMap((action) => {
        return this.authService.signUp(action.payload.signupRequest).pipe(
          map((user) => signUpSuccess({ payload: user })),
          catchError(async (error) => signUpFailure({ payload: { error:error.message } }))
        );
      })
    );
  });

  continueWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(continueWithGoogle),
      switchMap((action) =>
        this.authService.checkIfUserExists(action.payload.user).pipe(
          switchMap((resp: any) => {
            if (resp.exists) {
              return this.authService
                .signInWithGoogle(action.payload.user)
                .pipe(
                  map((data: any) =>
                    signInWithGoogleSuccess({
                      payload: {
                        user: data.user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        success: data.message,
                      },
                    })
                  ),
                  catchError((error) =>
                    of(signInWithGoogleFailure({ payload: { error:error.message } }))
                  )
                );
            } else {
              return this.authService
                .signUpWithGoogle(action.payload.user)
                .pipe(
                  map((data: any) =>
                    signUpWithGoogleSuccess({
                      payload: {
                        user: data.user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        success: data.message,
                      },
                    })
                  ),
                  catchError((error) =>
                    of(signUpWithGoogleFailure({ payload: { error:error.message } }))
                  )
                );
            }
          }),
          catchError((error) =>
            of(signInWithGoogleFailure({ payload: { error:error.message } }))
          )
        )
      )
    );
  });
}
