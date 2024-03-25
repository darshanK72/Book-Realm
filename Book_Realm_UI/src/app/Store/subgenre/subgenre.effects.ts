import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { SubgenreService } from 'src/app/Services/subgenre/subgenre.service';
import { load6SubgenresRandom, load6SubgenresRandomFailure, load6SubgenresRandomSuccess, loadSubgenresByGenre, loadSubgenresByGenreFailure, loadSubgenresByGenreSuccess } from './subgenre.actions';

@Injectable()
export class SubgenreEffects {
  constructor(
    private actions$: Actions,
    private subgenreService: SubgenreService
  ) {}

  getSubgenresByGenre$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSubgenresByGenre),
      exhaustMap((actions) =>
        this.subgenreService.getSubgenresByGenre(actions.payload.genreId).pipe(
          map((subgenres) => loadSubgenresByGenreSuccess({ payload: subgenres })),
          catchError(async (error) => loadSubgenresByGenreFailure({payload:error}))
        )
      )
    );
  });

  get6SubgenresRandom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(load6SubgenresRandom),
      exhaustMap(() =>
        this.subgenreService.get6SubgenresRandom().pipe(
          map((subgenres) => load6SubgenresRandomSuccess({ payload: subgenres })),
          catchError(async (error) => load6SubgenresRandomFailure({payload:error}))
        )
      )
    );
  });

}
