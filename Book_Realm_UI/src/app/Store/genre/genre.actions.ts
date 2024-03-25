import { createAction, props } from "@ngrx/store";

export const loadGenres = createAction("[Genres] Load All Genres");
export const loadGenresSuccess = createAction("[Genres] Load All Genres Success",props<{payload:any}>());
export const loadGenresFailure = createAction("[Genres] Load All Genres Failure",props<{payload:any}>());
