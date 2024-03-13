import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "src/app/Models/book";

const selectorState = createFeatureSelector<Book[]>('books');

export const selectBooks = createSelector(selectorState,(books) => {
    return books;
});

export const selectBooksById = (bookId:number) => createSelector(selectBooks,(books) => {
    return books.filter(b => b.id == bookId);
});

export const selectBooksByGenreId = (genreId:number) => createSelector(selectBooks,(books) => {
    return books.filter(b => b.genreId == genreId);
});

export const selectBooksBySubgenreId = (subgenreId:number) => createSelector(selectBooks,(books) => {
    return books.filter(b => b.subgenreId == subgenreId);
});