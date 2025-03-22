import { createReducer, on } from "@ngrx/store";
import { getBookSectionsFailure, getBookSectionsSuccess, getHeroSectionsFailure, getHeroSectionsSuccess, getHomeSectionsFailure, getHomeSectionsSuccess, getMediumBannerSectionsFailure, getMediumBannerSectionsSuccess, getSmallBannerSectionsSuccess, getSmallBannerSectionsFailure } from "./home.actions";
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
    })),
    on(getMediumBannerSectionsSuccess, (state, action) => ({
        ...state,
        medimuBannerSections: [...state.medimuBannerSections, {
            sectionId: action.payload.sectionId,
            mediumBanners: action.payload.mediumBanners
        }],
        error: null,
        success: action.payload.success
    })),
    on(getMediumBannerSectionsFailure, (state, action) => ({
        ...state,
        error: action.payload.error,
        success: null
    })),
    on(getSmallBannerSectionsSuccess, (state, action) => ({
        ...state,
        smallBannerSections: [...state.smallBannerSections, {
            sectionId: action.payload.sectionId,
            smallBanners: action.payload.smallBanners
        }],
        error: null,
        success: action.payload.success
    })),
    on(getSmallBannerSectionsFailure, (state, action) => ({
        ...state,
        error: action.payload.error,
        success: null
    }))
)