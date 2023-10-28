import { createAction, props } from "@ngrx/store";

export const getGenres = createAction("getGenres");
export const getGenresSuccess = createAction("getGenresSuccess",props<{payload:any}>());
