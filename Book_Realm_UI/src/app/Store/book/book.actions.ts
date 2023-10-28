import { createAction, props } from "@ngrx/store";

export const getBooks = createAction("getBooks");
export const getBooksSuccess = createAction("getBooksSuccess",props<{payload:any}>());

export const getBook = createAction("getBook");
export const getBooksSucces = createAction("getBooksSucces",props<{payload:any}>());