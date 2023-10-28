import { createReducer, on } from "@ngrx/store";
import {getSubgenresSuccess } from "./subgenre.actions";
import { state } from "./subgenre.state";

export const subgenreReducer = createReducer(
    state,
    on(getSubgenresSuccess,(state,action) => {
        return [...action.payload];
    })
)