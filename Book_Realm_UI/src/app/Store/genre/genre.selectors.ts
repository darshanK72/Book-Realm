import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Genre } from "src/app/Models/genre";

const selectorState = createFeatureSelector<Genre[]>("genres");

export const selectGenres = createSelector(selectorState,(genres) => {
    return genres;
})

export const selectGenreById = (genreId:number) => createSelector(selectGenres,(genres) => {
    return genres.find(g => g.id == genreId);
})
