import { createAction, props } from "@ngrx/store";

export const getHomeSections = createAction('[Home] Get Home Page Sections');
export const getHomeSectionsSuccess = createAction('[Home] Get Home Page Sections Success', props<{ payload: any }>());
export const getHomeSectionsFailure = createAction('[Home] Get Home Page Sections Failure', props<{ payload: any }>());

export const getHeroSections = createAction(
    '[Hero] Get Hero Sections',
    props<{ payload: { sectionId: string, heroIds: string[] } }>()
);
export const getHeroSectionsSuccess = createAction(
    '[Hero] Get Hero Sections Success',
    props<{ payload: { sectionId: string, heros: any[], success: string } }>()
);
export const getHeroSectionsFailure = createAction('[Hero] Get Hero Sections Failure', props<{ payload: any }>());

export const getBookSections = createAction(
    '[Book] Get Book Sections',
    props<{ payload: { sectionId: string, sectionName: string, bookIds: string[] } }>()
);
export const getBookSectionsSuccess = createAction(
    '[Book] Get Book Sections Success',
    props<{ payload: { sectionId: string, sectionName: string, books: any[], success: string } }>()
);
export const getBookSectionsFailure = createAction('[Book] Get Book Sections Failure', props<{ payload: any }>());
