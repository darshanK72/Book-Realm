import { createAction, props } from "@ngrx/store";

export const getSubgenres = createAction("getSubgenres");
export const getSubgenresSuccess = createAction("getSubgenresSuccess",props<{payload:any}>());
