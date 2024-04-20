import { Hero } from "src/app/Models/hero";
import { HomeSection } from "src/app/Payloads/homeSection";

export interface HomeState{
    sections:HomeSection[];
    heros:Hero[];
    bookSections:any;
    smallBanners:any;
    midiumBanners:any;
    largeBanners:any;
    error: any;
    success:any;
}

export const state:HomeState = {
    sections: [],
    heros:[],
    bookSections:[],
    smallBanners:[],
    midiumBanners:[],
    largeBanners:[],
    error:null,
    success:null
}