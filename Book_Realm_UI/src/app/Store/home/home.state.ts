import { HomeSection } from "src/app/Payloads/homeSection";

export interface HomeState{
    sections:HomeSection[];
    error: any;
    success:any;
}

export const state:HomeState = {
    sections: [],
    error:null,
    success:null
}