import { createReducer, on } from '@ngrx/store';
import { state } from './shared.state';
import { startLoading, stopLoading } from './shared.actions';

export const sharedReducer = createReducer(
  state,
  on(startLoading, (state) => ({
    ...state,
    isLoading:true
  })),
  on(stopLoading, (state) => ({
    ...state,
    isLoading:false
  }))
);
