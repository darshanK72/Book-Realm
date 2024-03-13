import { createReducer, on } from "@ngrx/store";
import { getBooksSuccess } from "./book.actions";
import { state } from "./book.state";

export const bookReducer = createReducer(
    state,
    on(getBooksSuccess,(state,action) => {
        return [...action.payload];
    })
)