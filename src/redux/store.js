import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './linksSlice.js';
import uiReducer from './uiSlice.js';
import filtersSlice from './filtersSlice.js';
import actionSlice, { actionHappened } from './actionSlice.js';


export function initStore(data) {
	return configureStore({
		reducer: {
			links: linksReducer,
			ui: uiReducer,
			filters: filtersSlice,
			action: actionSlice
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