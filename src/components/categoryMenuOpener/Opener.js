import { OPEN_CATEGORY_MENU_BUTTON, CATEGORY_MENU, CONTENT } from '../classNames.js';

export default class Opener {
	constructor(storeAction) {
		this.node = document.querySelector(`.${OPEN_CATEGORY_MENU_BUTTON}`);
		this.content = document.querySelector(`.${CONTENT}`);
		this.menu = document.querySelector(`.${CATEGORY_MENU}`);

		this.node.addEventListener('click', (e) => {
			storeAction();
		});
	}

	open() {
		this.content.classList.add('hide');
		this.menu.classList.add('show');
		this.node.classList.add('hide');
	}

	close() {
		this.content.classList.remove('hide');
		this.menu.classList.remove('show');
		this.node.classList.remove('hide');
	}

	update(isOpen) {
		isOpen ? this.open() : this.close();
	}
}