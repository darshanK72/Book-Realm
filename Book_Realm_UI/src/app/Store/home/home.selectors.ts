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

// Selector for getting medium banner section by ID
export const selectMediumBannerSectionById = (sectionId: string) => createSelector(
  selectorState,
  (state) => state.medimuBannerSections.find(section => section.sectionId === sectionId)
);

// Selector for getting all medium banner sections
export const selectAllMediumBannerSections = createSelector(
  selectorState,
  (state) => state.medimuBannerSections
);

// Optional: Selector for getting medium banners from a specific section
export const selectMediumBannersFromSection = (sectionId: string) => createSelector(
  selectMediumBannerSectionById(sectionId),
  (section) => section ? section.mediumBanners : []
);

// Selector for getting small banner section by ID
export const selectSmallBannerSectionById = (sectionId: string) => createSelector(
  selectorState,
  (state) => state.smallBannerSections.find(section => section.sectionId === sectionId)
);

// Selector for getting all small banner sections
export const selectAllSmallBannerSections = createSelector(
  selectorState,
  (state) => state.smallBannerSections
);

// Optional: Selector for getting small banners from a specific section
export const selectSmallBannersFromSection = (sectionId: string) => createSelector(
  selectSmallBannerSectionById(sectionId),
  (section) => section ? section.smallBanners : []
);

// Selector for getting large banner section by ID
export const selectLargeBannerSectionById = (sectionId: string) => createSelector(
  selectorState,
  (state) => state.largeBannerSections.find(section => section.sectionId === sectionId)
);

// Selector for getting all large banner sections
export const selectAllLargeBannerSections = createSelector(
  selectorState,
  (state) => state.largeBannerSections
);

// Optional: Selector for getting large banners from a specific section
export const selectLargeBannersFromSection = (sectionId: string) => createSelector(
  selectLargeBannerSectionById(sectionId),
  (section) => section ? section.largeBanners : []
);
