import Placeholder from './Placeholder.js';

export default class PlaceholderWrapper {
	constructor(store, categoriesCount) {
		this.store = store;
		this.component = null;
	}

	mount(categoriesCount) {
		this.component = new Placeholder(categoriesCount);
	}

	update(categoriesCount) {
		this.component.update(categoriesCount);
	}
}