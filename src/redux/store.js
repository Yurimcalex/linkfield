import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './linksSlice.js';

export function initStore(data) {
	return configureStore({
		reducer: {
			links: linksReducer
		},
		
		preloadedState: {
			links: {
				data
			}
		}
	});
}