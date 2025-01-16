import { configureStore } from '@reduxjs/toolkit';

export function initStore(data) {
	return configureStore({
		reducer: {}
	});
}