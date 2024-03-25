import { createAction, props } from "@ngrx/store";

export const loadSubgenresByGenre = createAction("[Subgenres] Load Subgenres By Genre",props<{payload:any}>());
export const loadSubgenresByGenreSuccess  = createAction("[Subgenres] Load Subgenres By Genre Success",props<{payload:any}>());
export const loadSubgenresByGenreFailure  = createAction("[Subgenres] Load Subgenres By Genre Failure",props<{payload:any}>());

export const load6SubgenresRandom = createAction("[Subgenres] Load 6 Subgenres Random");
export const load6SubgenresRandomSuccess  = createAction("[Subgenres] Load 6 Subgenres Random Success",props<{payload:any}>());
export const load6SubgenresRandomFailure  = createAction("[Subgenres] Load 6 Subgenres Random Failure",props<{payload:any}>());