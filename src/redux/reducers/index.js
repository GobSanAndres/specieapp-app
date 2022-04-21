import {  initialState  } from '../store/initialState';

export const reducer = (
    state = initialState,
    action
) => (action.reducer ? action.reducer(state, action.payload) : state);