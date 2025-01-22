import { dom } from '../elements.js';


export default class Opener {
	constructor(storeAction) {
		this.node = dom.categoryMenu.getOpener();
		this.content = dom.getContent();
		this.menu = dom.categoryMenu.getMenu();

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