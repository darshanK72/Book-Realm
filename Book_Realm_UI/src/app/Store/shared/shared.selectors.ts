import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const selectorState = createFeatureSelector<SharedState>('shared');

export const selectIsLoading = createSelector(selectorState, (state) => state.isLoading);
