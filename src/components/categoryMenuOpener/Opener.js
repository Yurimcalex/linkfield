import { CONTENT_HIDE, CATEGORY_MENU_SHOW, CATEGORY_MENU_OPENER_HIDE } from '../classNames.js';
import { dom } from '../elements.js';


export default class Opener {
	constructor(storeAction) {
		this.storeAction = storeAction;
		this.node = dom.categoryMenu.getOpener();
		this.content = dom.getContent();
		this.menu = dom.categoryMenu.getMenu();
		this.handleClick = this.handleClick.bind(this);

		this.node.addEventListener('click', this.handleClick);
	}

	remove() {
		this.node.removeEventListener('click', this.handleClick);
	}

	handleClick(e) {
		this.storeAction();
	}

	open() {
		this.content.classList.add(`${CONTENT_HIDE}`);
		this.menu.classList.add(`${CATEGORY_MENU_SHOW}`);
		this.node.classList.add(`${CATEGORY_MENU_OPENER_HIDE}`);
	}

	close() {
		this.content.classList.remove(`${CONTENT_HIDE}`);
		this.menu.classList.remove(`${CATEGORY_MENU_SHOW}`);
		this.node.classList.remove(`${CATEGORY_MENU_OPENER_HIDE}`);
	}

	update(isOpen) {
		isOpen ? this.open() : this.close();
	}
}