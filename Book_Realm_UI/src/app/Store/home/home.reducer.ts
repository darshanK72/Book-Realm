import { createReducer, on } from "@ngrx/store";
import { getBookSectionsFailure, getBookSectionsSuccess, getHeroSectionsFailure, getHeroSectionsSuccess, getHomeSectionsFailure, getHomeSectionsSuccess } from "./home.actions";
import { state } from "./home.state";

export const homeReducer = createReducer(
    state,
    on(getHomeSectionsSuccess,(state,action) => ({
        ...state,
        sections : action.payload.sections,
        error:null,
        success : action.payload.success
    })),
    on(getHomeSectionsFailure,(state,action) =>({
        ...state,
        sections:[],
        error:action.payload.error,
        success:null
    })),
    on(getHeroSectionsSuccess, (state, action) => ({
        ...state,
        heroSections: [...state.heroSections, {
            sectionId: action.payload.sectionId,
            heros: action.payload.heros
        }],
        error: null,
        success: action.payload.success
    })),
    on(getHeroSectionsFailure, (state, action) => ({
        ...state,
        error: action.payload.error,
        success: null
    })),
    on(getBookSectionsSuccess, (state, action) => ({
        ...state,
        bookSections: [...state.bookSections, {
            sectionId: action.payload.sectionId,
            sectionName: action.payload.sectionName,
            books: action.payload.books
        }],
        error: null,
        success: action.payload.success
    })),
    on(getBookSectionsFailure, (state, action) => ({
        ...state,
        error: action.payload.error,
        success: null
    }))
)