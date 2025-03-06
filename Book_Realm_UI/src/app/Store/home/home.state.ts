import { Book } from "src/app/Models/book";
import { Hero } from "src/app/Models/hero";
import { HomeSection } from "src/app/Payloads/homeSection";

export interface HomeState{
    sections:HomeSection[];
    sectionHeros:Hero[];
    sectionBooks:Book[];
    sectionSmallBanners:any;
    sectionMidiumBanners:any;
    sectionLargeBanners:any;
    error: any;
    success:any;
}

export const state:HomeState = {
    sections: [],
    sectionHeros:[],
    sectionBooks: [],        
    sectionSmallBanners: [],
    sectionMidiumBanners: [],
    sectionLargeBanners: [],
    error:null,
    success:null
}