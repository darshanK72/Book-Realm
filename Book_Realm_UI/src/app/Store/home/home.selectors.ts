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
