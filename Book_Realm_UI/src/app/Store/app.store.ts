import { authReducer } from "./auth/auth.reducer";
import { bookReducer } from "./book/book.reducer";
import { genreReducer } from "./genre/genre.reducer";
import { sharedReducer } from "./shared/shared.reducer";
import { subgenreReducer } from "./subgenre/subgenre.reducer";

export const AppStore = {
    auth:authReducer,
    shared:sharedReducer,
    books:bookReducer,
    genres:genreReducer,
    subgenres:subgenreReducer
}