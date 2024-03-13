import { createReducer, on } from "@ngrx/store";
import { getGenresSuccess } from "./genre.actions";
import { state } from "./genre.state";

export const genreReducer = createReducer(
    state,
    on(getGenresSuccess,(state,action) => {
        return [...action.payload];
    })
)