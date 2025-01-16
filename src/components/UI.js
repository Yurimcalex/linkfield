import { categoryMenu } from './categoryMenuWrapper.js';




export default class UI {
	constructor(store) {
		this.store = store;
	}

	mount() {
		categoryMenu.mount(this.store);
	}

	update() {
		categoryMenu.update(this.store);
	}
}