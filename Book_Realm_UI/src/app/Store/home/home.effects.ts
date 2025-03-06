import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs';
import {
  getBookSections,
  getBookSectionsFailure,
  getBookSectionsSuccess,
  getHeroSections,
  getHeroSectionsFailure,
  getHeroSectionsSuccess,
  getHomeSections,
  getHomeSectionsFailure,
  getHomeSectionsSuccess,
} from './home.actions';
import { HomeService } from 'src/app/Services/home/home.service';
import { BookService } from 'src/app/Services/book/book.service';
@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeService: HomeService,private bookService:BookService) {}

  getHomeSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getHomeSections),
      exhaustMap(() =>
        this.homeService.getAllHomeSections().pipe(
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

  getHeroSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getHeroSections),
      mergeMap((action) => {
        return this.homeService.getHeroByIds(action.payload).pipe(
          map((data: any) => {
            return getHeroSectionsSuccess({
              payload: {
                heros:data,
                success: 'success'
              },
            });
          }),
          catchError(async (error:any) =>{
            return getHeroSectionsFailure({ payload: { error:error.error } })
          }
          )
        );
      })
    );
  });

  getBookSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBookSections),
      mergeMap((action) => {
        return this.bookService.getBooksByIds(action.payload).pipe(
          map((data: any) => {
            return getBookSectionsSuccess({
              payload: {
                books:data,
                success: 'success'
              },
            });
          }),
          catchError(async (error:any) =>{
            return getBookSectionsFailure({ payload: { error:error.error } })
          }
          )
        );
      })
    );
  });

}
