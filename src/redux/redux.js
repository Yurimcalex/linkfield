import { initStore } from './store.js';

export function createStore(data) {
	const store = initStore(data);
	return store;
}