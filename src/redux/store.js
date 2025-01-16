import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './linksSlice.js';
import uiReducer from './uiSlice.js';


export function initStore(data) {
	return configureStore({
		reducer: {
			links: linksReducer,
			ui: uiReducer
		},
		
		preloadedState: data
	});
}