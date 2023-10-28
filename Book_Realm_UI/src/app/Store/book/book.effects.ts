import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, EMPTY, exhaustMap, map, tap } from "rxjs";
import { BookService } from "src/app/Services/book.service";
import { getBooks, getBooksSuccess } from "./book.actions";

@Injectable()
export class BookEffects{

    constructor(private actions$:Actions,private bookService:BookService){}

    getPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getBooks),
            exhaustMap(() =>
            this.bookService.getAllBooks().pipe(
              tap(data => console.log(data)),
              map((books) => getBooksSuccess({ payload: books })),
              catchError(() => EMPTY)
            )
          )
        )
    })
}