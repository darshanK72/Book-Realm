import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { GenreService } from 'src/app/Services/genre/genre.service';
import { loadGenres, loadGenresFailure, loadGenresSuccess } from './genre.actions';


@Injectable()
export class GenreEffects {
  constructor(private actions$: Actions, private genreService: GenreService) {}

  getGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGenres),
      exhaustMap(() =>
        this.genreService.getAllGenres().pipe(
          tap((data) => console.log(data)),
          map((genres) => loadGenresSuccess({ payload: genres })),
          catchError(async (error) => loadGenresFailure({payload:error}))
        )
      )
    );
  });
}
