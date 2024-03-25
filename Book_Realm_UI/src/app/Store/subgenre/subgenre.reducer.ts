import { createReducer, on } from "@ngrx/store";
import {load6SubgenresRandomSuccess, loadSubgenresByGenreSuccess } from "./subgenre.actions";
import { state } from "./subgenre.state";

export const subgenreReducer = createReducer(
    state,
    on(loadSubgenresByGenreSuccess,(state,action) => {
        return [...action.payload];
    }),
    on(load6SubgenresRandomSuccess,(state,action) => {
        return [...action.payload];
    })
)