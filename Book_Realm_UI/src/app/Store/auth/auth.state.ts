import { User } from "src/app/Models/user";

export interface AuthState {
    user:User | null;
    accessToken:any;
    refreshToken:any;
    isLoggedIn: boolean;
    error: any;
    success:any;
  }

export const state: AuthState = {
  user: null,
  accessToken:null,
  refreshToken:null,
  isLoggedIn: false,
  error: null,
  success:null,
};