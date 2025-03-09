import { Book } from "src/app/Models/book";
import { Hero } from "src/app/Models/hero";
import { HomeSection } from "src/app/Payloads/homeSection";

export interface HeroSections {
    sectionId: string;
    heros: Hero[];
}
export interface BookSections {
    sectionId: string;
    sectionName: string;
    books: Book[];
}

export interface BookSections {
    sectionId: string;
    sectionName: string;
    books: Book[];
}

export interface SmallBannerSection {
    sectionId: string;
    sectionName: string;
    smallBanners: Book[];
}

export interface MediumBannerSection {
    sectionId: string;
    sectionName: string;
    mediumBanners: [];
}

export interface LargeBannerSection {
    sectionId: string;
    largeBanners: [];
}

export interface HomeState {
    sections: HomeSection[];
    heroSections: HeroSections[];
    bookSections: BookSections[];
    smallBannerSections: SmallBannerSection[];
    medimuBannerSections: MediumBannerSection[];
    largeBannerSections: LargeBannerSection[];
    error: any;
    success: any;
}

export const state: HomeState = {
    sections: [],
    heroSections: [],
    bookSections: [],
    smallBannerSections: [],
    medimuBannerSections: [],
    largeBannerSections: [],
    error: null,
    success: null
}