import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  constructor(private actions$: Actions, private authService: AuthService) { }

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
          catchError(async (error: any) => {
            console.error('Sign In Error:', error);
            return signInFailure({ payload: { error: error.error } })
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
            signUpFailure({ payload: { error: error.error } })
          )
        );
      })
    );
  });

  continueWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(continueWithGoogle),
      switchMap((action) => {
        console.log('🔵 [Google OAuth] User data received from Google:', action.payload.user);
        return this.authService.checkIfUserExists(action.payload.user).pipe(
          switchMap((resp: any) => {
            console.log('🔵 [Google OAuth] Check user exists response:', resp);
            if (resp.exists) {
              console.log('✅ [Google OAuth] User exists, signing in...');
              return this.authService
                .signInWithGoogle(action.payload.user)
                .pipe(
                  map((data: any) => {
                    console.log('✅ [Google OAuth] Sign in successful:', data);
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
                  catchError((error) => {
                    console.error('❌ [Google OAuth] Sign in failed:', error);
                    return of(
                      signInWithGoogleFailure({
                        payload: { error: error.error },
                      })
                    );
                  })
                );
            } else {
              console.log('🆕 [Google OAuth] New user, signing up...');
              return this.authService
                .signUpWithGoogle(action.payload.user)
                .pipe(
                  map((data: any) => {
                    console.log('✅ [Google OAuth] Sign up successful:', data);
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
                  catchError((error) => {
                    console.error('❌ [Google OAuth] Sign up failed:', error);
                    return of(
                      signUpWithGoogleFailure({
                        payload: { error: error.error },
                      })
                    );
                  })
                );
            }
          }),
          catchError((error) => {
            console.error('❌ [Google OAuth] Check user exists failed:', error);
            return of(signInWithGoogleFailure({ payload: { error: error.error } }));
          })
        )
      })
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
