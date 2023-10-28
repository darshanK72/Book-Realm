import { Book } from "../Models/book";
import { Genre } from "../Models/genre";
import { Subgenre } from "../Models/subgenre";

export interface AppState{
    books:Book[];
    genres:Genre[];
    subgenres:Subgenre[];
}