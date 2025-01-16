import { categoryMenu } from './categoryMenuWrapper.js';




export default class UI {
	constructor(store) {
		this.store = store;
	}

	mount(store) {
		this.categoryMenu = categoryMenu.mount(this.store);
	}

	update() {}
}