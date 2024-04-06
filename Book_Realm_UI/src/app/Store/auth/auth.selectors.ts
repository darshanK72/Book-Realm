import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const selectorState = createFeatureSelector<AuthState>('auth');

export const selectLoggedInUser = createSelector(selectorState, (state) => state.user);

export const selectAccessToken = createSelector(selectorState, (state) => state.accessToken);

export const selectRefreshToken = createSelector(selectorState, (state) => state.refreshToken);

export const selectIsLoggedIn = createSelector(selectorState, (state) => state.isLoggedIn);
