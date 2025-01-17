import CategoryMenu from './categoryMenu/MenuWrapper.js';
import MenuOpener from './categoryMenuOpener/OpenerWrapper.js';
import CommonComponent from './common/ComponentWrapper.js';

export default class UI {
	constructor(store) {
		this.categoryMenu = new CategoryMenu(store);
		this.menuOpener = new MenuOpener(store);
		this.commonComponent = new CommonComponent(store);
	}

	mount() {
		this.categoryMenu.mount();
		this.menuOpener.mount();
		this.commonComponent.mount();
	}

	update() {
		this.categoryMenu.update();
		this.menuOpener.update();
		this.commonComponent.update();
	}
}