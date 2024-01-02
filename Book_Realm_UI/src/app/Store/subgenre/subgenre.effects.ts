import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { SubgenreService } from 'src/app/Services/subgenre/subgenre.service';
import {
  getSubgenres,
  getSubgenresSuccess,
} from './subgenre.actions';

@Injectable()
export class SubgenreEffects {
  constructor(
    private actions$: Actions,
    private subgenreService: SubgenreService
  ) {}

  getSubgenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSubgenres),
      exhaustMap(() =>
        this.subgenreService.getAllSubgenres().pipe(
          map((subgenre) => getSubgenresSuccess({ payload: subgenre })),
          catchError(() => EMPTY)
        )
      )
    );
  });

}
