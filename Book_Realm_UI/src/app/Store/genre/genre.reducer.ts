import { createReducer, on } from "@ngrx/store";
import { loadGenresSuccess } from "./genre.actions";
import { state } from "./genre.state";

export const genreReducer = createReducer(
    state,
    on(loadGenresSuccess,(state,action) => {
        return [...action.payload];
    })
)