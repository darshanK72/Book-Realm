import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map, mergeMap, tap } from 'rxjs';
import { BookService } from 'src/app/Services/book/book.service';
import {
  getHomeSections,
  getHomeSectionsFailure,
  getHomeSectionsSuccess,
} from './home.actions';
import { HomeService } from 'src/app/Services/home/home.service';
@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  getHomeSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getHomeSections),
      exhaustMap(() =>
        this.homeService.getAllHomeSections().pipe(
          tap((data) => console.log(data)),
          map((sections) => getHomeSectionsSuccess({ payload: {
            sections,
            success:'success'
          } })),
          catchError(async (error) => getHomeSectionsFailure({ payload: {
            error:error.error.message
          } }))
        )
      )
    );
  });
}
