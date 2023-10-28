import { bookReducer } from "./book/book.reducer";
import { genreReducer } from "./genre/genre.reducer";
import { subgenreReducer } from "./subgenre/subgenre.reducer";

export const AppStore = {
    books:bookReducer,
    genres:genreReducer,
    subgenres:subgenreReducer
}