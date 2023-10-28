import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Subgenre } from "src/app/Models/subgenre";

const selectorState = createFeatureSelector<Subgenre[]>("subgenres");

export const selectSubgenres = createSelector(selectorState,(subgenres) => {
    return subgenres;
})

export const selectSubgenreById = (subgenreId:number) =>  createSelector(selectSubgenres,(subgenres) => {
    return subgenres.find(s => s.id == subgenreId)
})

export const selectSubgenresByGenreId = (genreId:number) => createSelector(selectSubgenres,(subgenres) => {
    return subgenres.filter(s => s.genreId == genreId);
})
