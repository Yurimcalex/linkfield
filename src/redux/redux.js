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