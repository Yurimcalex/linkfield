import ThemeMenu from './ThemeMenu.js';


export default class ThemeMenuWrapper {
	constructor(store) {
		this.component = null;
	}

	mount() {
		this.component = new ThemeMenu();
	}

	update() {
		this.component.update();
	}
}