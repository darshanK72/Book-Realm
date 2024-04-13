import { createAction, props } from "@ngrx/store";

export const getHomeSections = createAction('[Home] Get Home Page Sections');
export const getHomeSectionsSuccess = createAction('[Home] Get Home Page Sections Success', props<{ payload: any}>());
export const getHomeSectionsFailure = createAction('[Home] Get Home Page Sections Failure', props<{ payload: any }>());
