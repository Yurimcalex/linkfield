import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './linksSlice.js';
import uiReducer from './uiSlice.js';
import filtersSlice from './filtersSlice.js';
import actionSlice, { actionHappened } from './actionSlice.js';
import userSlice from './userSlice.js';


export function initStore(data) {
	return configureStore({
		reducer: {
			links: linksReducer,
			ui: uiReducer,
			filters: filtersSlice,
			action: actionSlice,
      user: userSlice
		},

		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logActionType),
		enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(actionEnhancer),
		preloadedState: data
	});
}


const actionEnhancer = (createStore) => {
  return (reducer, state, enhancer) => {
    const store = createStore(reducer, state, enhancer)
    const newDispatch = (action) => {
      const result = store.dispatch(action);
      store.dispatch(actionHappened(action.type));
      store.dispatch(actionHappened(''));
      return result;
    }

    return { ...store, dispatch: newDispatch };
  }
}


function logActionType(store) {
  return next => action => {
    console.log(action.type);
    return next(action);
  }
}