import { dom } from '../../elements.js';


export default class Placeholder {
	constructor(categoriesCount) {
		this.node = dom.getContentPlaceholder();
		if (categoriesCount) this.node.style.display = 'none';
	}

	update(categoriesCount) {
		if (categoriesCount) {
			this.node.style.display = 'none';
		} else {
			this.node.style.display = '';
		}
	}

	create() {}
}