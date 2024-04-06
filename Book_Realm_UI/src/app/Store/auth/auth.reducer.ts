import { createReducer, on } from '@ngrx/store';
import { state } from './auth.state';
import {
  signInFailure,
  signInSuccess,
  signInWithGoogleFailure,
  signInWithGoogleSuccess,
  signUpFailure,
  signUpSuccess,
  signUpWithGoogleFailure,
  signUpWithGoogleSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  state,
  on(signInSuccess, (state, action) => ({
    ...state,
    user: action.payload.user,
    accessToken: action.payload.accessToken,
    refreshToken: action.payload.refreshToken,
    isLoggedIn: true,
    error: null,
    success: action.payload.success,
  })),
  on(signInFailure, (state, action) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    error: action.payload.error,
    success: null,
  })),
  on(signUpSuccess, (state, action) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    error: null,
    success: action.payload.message,
  })),
  on(signUpFailure, (state, action) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    error: action.payload.error,
    success: null,
  })),
  on(signInWithGoogleSuccess, (state, action) => ({
    ...state,
    user: action.payload.user,
    accessToken: action.payload.accessToken,
    refreshToken: action.payload.refreshToken,
    isLoggedIn: true,
    error: null,
    success: action.payload.success,
  })),
  on(signInWithGoogleFailure, (state, action) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    error: action.payload.error,
    success: null,
  })),
  on(signUpWithGoogleSuccess, (state, action) => ({
    ...state,
    user: action.payload.user,
    accessToken: action.payload.accessToken,
    refreshToken: action.payload.refreshToken,
    isLoggedIn: true,
    error: null,
    success: action.payload.success,
  })),
  on(signUpWithGoogleFailure, (state, action) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    error: action.payload.error,
    success: null,
  }))

  // on(AuthActions.logout, state => ({
  //   ...state,
  //   user: null,
  //   isLoggedIn: false,
  //   error: null
  // }))
);