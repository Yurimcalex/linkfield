import CategoryMenu from './categoryMenu/MenuWrapper.js';


export default class UI {
	constructor(store) {
		this.categoryMenu = new CategoryMenu(store);
	}

	mount() {
		this.categoryMenu.mount();
	}

	update() {
		this.categoryMenu.update();
	}
}