import { createAction, props } from "@ngrx/store";

export const loadBooksByGenre = createAction('[Books] Load Books By Genre', props<{ payload: any }>());
export const loadBooksByGenreSuccess = createAction('[Books] Load Books By Genre Success', props<{ payload: any}>());
export const loadBooksByGenreFailure = createAction('[Books] Load Books By Genre Failure', props<{ payload: any }>());

export const loadBooksBySubgenre = createAction('[Books] Load Books By Subgenre', props<{ payload: any }>());
export const loadBooksBySubgenreSuccess = createAction('[Books] Load Books By Subgenre Success', props<{ payload: any}>());
export const loadBooksBySubgenreFailure = createAction('[Books] Load Books By Subgenre Failure', props<{ payload: any }>());