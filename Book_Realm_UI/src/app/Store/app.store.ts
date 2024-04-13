import { authReducer } from "./auth/auth.reducer";
import { bookReducer } from "./book/book.reducer";
import { genreReducer } from "./genre/genre.reducer";
import { homeReducer } from "./home/home.reducer";
import { sharedReducer } from "./shared/shared.reducer";
import { subgenreReducer } from "./subgenre/subgenre.reducer";

export const AppStore = {
    auth:authReducer,
    home:homeReducer,
    shared:sharedReducer,
    books:bookReducer,
    genres:genreReducer,
    subgenres:subgenreReducer
}