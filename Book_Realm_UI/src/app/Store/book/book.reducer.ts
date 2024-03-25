import { createReducer, on } from "@ngrx/store";
import { loadBooksByGenreSuccess, loadBooksBySubgenreSuccess } from "./book.actions";
import { state } from "./book.state";

export const bookReducer = createReducer(
    state,
    on(loadBooksByGenreSuccess,(state,action) => {
        const newBooks = action.payload.filter((book:any) => !state.some(existingBook => existingBook.id === book.id));
        return [...state, ...newBooks];
    }),
    on(loadBooksBySubgenreSuccess,(state,action) => {
        const newBooks = action.payload.filter((book:any) => !state.some(existingBook => existingBook.id === book.id));
        return [...state, ...newBooks];
    })
)