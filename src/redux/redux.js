import { initStore } from './store.js';

export function createStore(data) {
	const store = initStore(data);
	return {
		store,
		useSelector(fn) {
			return (...args) => {
				return fn(store.getState(), ...args);
			};
		},
		useDispatch() {
			return store.dispatch;
		}
	};
}


export function useSelector(owner, store, selectors) {
	selectors.forEach(selector => owner[selector.name] = store.useSelector(selector));
}


export function useDispatch(owner, store, actions) {
	actions.forEach(action => owner[action.name] = action(store.useDispatch()));
}