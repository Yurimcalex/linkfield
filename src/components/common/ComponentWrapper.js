import Component from './Component.js';
import { changeScreenSize } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.storeAction = changeScreenSize(store.useDispatch());
	}

	mount() {
		this.component = new Component(this.storeAction);
	}

	update() {}
}