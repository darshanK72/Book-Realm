import { Book } from "../Models/book";
import { Genre } from "../Models/genre";
import { Subgenre } from "../Models/subgenre";
import { AuthState } from "./auth/auth.state";
import { HomeState } from "./home/home.state";
import { SharedState } from "./shared/shared.state";

export interface AppState{
    auth:AuthState,
    home:HomeState,
    shared:SharedState,
    books:Book[];
    genres:Genre[];
    subgenres:Subgenre[];
}