import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, EMPTY, exhaustMap, map, mergeMap, tap } from "rxjs";
import { BookService } from "src/app/Services/book/book.service";
import { loadBooksByGenre, loadBooksByGenreFailure, loadBooksByGenreSuccess, loadBooksBySubgenre, loadBooksBySubgenreFailure, loadBooksBySubgenreSuccess } from "./book.actions";
@Injectable()
export class BookEffects{

    constructor(private actions$:Actions,private bookService:BookService){}

    getPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadBooksByGenre),
            exhaustMap(() =>
            this.bookService.getAllBooks().pipe(
              tap(data => console.log(data)),
              map((books) => loadBooksByGenreSuccess({ payload: books })),
              catchError(async (error) => loadBooksByGenreFailure({ payload: error }))
            )
          )
        )
    })

    getBooksBySubgenre$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(loadBooksBySubgenre),
          mergeMap((action) =>
          this.bookService.getBooksBySubgenre(action.payload.subgenreId).pipe(
            tap(data => console.log(data)),
            map((books) => loadBooksBySubgenreSuccess({ payload: books })),
            catchError(async (error) => loadBooksBySubgenreFailure({ payload: error }))
          )
        ),
      )
  })
}