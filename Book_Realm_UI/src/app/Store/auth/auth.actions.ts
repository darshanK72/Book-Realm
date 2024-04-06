import { createAction, props } from "@ngrx/store";

export const singnUp = createAction('[Auth] Sign Up', props<{ payload: any }>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{ payload: any}>());
export const signUpFailure = createAction('[[Auth] Sign Up Failure', props<{ payload: any }>());

export const signIn = createAction('[Auth] Sign In', props<{ payload: any }>());
export const signInSuccess = createAction('[Auth] Sign In Success', props<{ payload: any}>());
export const signInFailure = createAction('[Auth] Sign In Failure', props<{ payload: any }>());

export const continueWithGoogle = createAction('[Auth] Continue With Google', props<{ payload: any }>());

export const signUpWithGoogleSuccess = createAction('[Auth] Sign Up With Google Success', props<{ payload: any}>());
export const signUpWithGoogleFailure = createAction('[Auth] Sign Up With Google Failure', props<{ payload: any }>());


export const signInWithGoogleSuccess = createAction('[Auth] Sign In With Google Success', props<{ payload: any}>());
export const signInWithGoogleFailure = createAction('[Auth] Sign In With Google Failure', props<{ payload: any }>());
