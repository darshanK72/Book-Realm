import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.state';

const selectorState = createFeatureSelector<HomeState>('home');

export const selectAllSections = createSelector(
  selectorState,
  (state) => state.sections
);

// export const selectHeros = createSelector(
//   selectorState,
//   (state) => state.sections;
// )

// export const selectBooks = createSelector(
//   selectorState,
//   (state) => state.bookSections
// )

export const selectHeroSection = createSelector(selectAllSections, (sections) =>
  sections.find((section) => section.sectionName == 'Hero')
);

export const selectBookSections = createSelector(selectAllSections, (sections) =>
  sections.filter((section) => section.sectionName == 'Book')
);

export const selectLargeBannerSections = createSelector(selectAllSections, (sections) =>
  sections.filter((section) => section.sectionName == 'LargeBanner')
);

export const selectMediumBannerSections = createSelector(selectAllSections, (sections) =>
  sections.filter((section) => section.sectionName == 'MediumBanner')
);

export const selectSmallBannerSections = createSelector(selectAllSections, (sections) =>
  sections.filter((section) => section.sectionName == 'SmallBanner')
);

// New selectors for getting sections by ID
export const selectHeroSectionById = (sectionId: string) => createSelector(
  selectorState,
  (state) => state.heroSections.find(section => section.sectionId === sectionId)
);

export const selectBookSectionById = (sectionId: string) => createSelector(
  selectorState,
  (state) => state.bookSections.find(section => section.sectionId === sectionId)
);

// Selectors to get all hero and book sections
export const selectAllHeroSections = createSelector(
  selectorState,
  (state) => state.heroSections
);

export const selectAllBookSections = createSelector(
  selectorState,
  (state) => state.bookSections
);
