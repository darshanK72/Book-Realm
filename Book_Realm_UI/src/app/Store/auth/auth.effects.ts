import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';
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
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  singnIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      mergeMap((action) => {
        return this.authService.signIn(action.payload.signinRequest).pipe(
          map((data: any) => {
            this.authService.setAuthenticationState(data);
            return signInSuccess({
              payload: {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                success: data.message,
              },
            });
          }),
          catchError(async (error:any) =>{
            console.error('Sign In Error:', error);
            return signInFailure({ payload: { error:error.error } })
          }
          )
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
          catchError(async (error) =>
            signUpFailure({ payload: {error:error.error  } })
          )
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
                  map((data: any) => {
                    this.authService.setAuthenticationState(data);
                    return signInWithGoogleSuccess({
                      payload: {
                        user: data.user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        success: data.message,
                      },
                    });
                  }),
                  catchError((error) =>
                    of(
                      signInWithGoogleFailure({
                        payload: { error:error.error  },
                      })
                    )
                  )
                );
            } else {
              return this.authService
                .signUpWithGoogle(action.payload.user)
                .pipe(
                  map((data: any) =>{
                    this.authService.setAuthenticationState(data);
                    return signUpWithGoogleSuccess({
                      payload: {
                        user: data.user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        success: data.message,
                      },
                    })
                  }
                  ),
                  catchError((error) =>
                    of(
                      signUpWithGoogleFailure({
                        payload: {error:error.error  },
                      })
                    )
                  )
                );
            }
          }),
          catchError((error) =>
            of(signInWithGoogleFailure({ payload: { error:error.error } }))
          )
        )
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signOut),
      tap(() => {
        this.authService.clearAuthenticationState();
      })
    );
  }, { dispatch: false });
}
