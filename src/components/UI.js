import CategoryMenu from './categoryMenu/MenuWrapper.js';
import MenuOpener from './categoryMenuOpener/OpenerWrapper.js';


export default class UI {
	constructor(store) {
		this.categoryMenu = new CategoryMenu(store);
		this.menuOpener = new MenuOpener(store);
	}

	mount() {
		this.categoryMenu.mount();
		this.menuOpener.mount();
	}

	update() {
		this.categoryMenu.update();
		this.menuOpener.update();
	}
}