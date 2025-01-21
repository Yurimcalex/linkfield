import Content from './Content.js';
import Category from './category/CategoryWrapper.js';
import { useSelector } from '../../redux/redux.js';
import { selectCategoryNames } from '../../redux/linksSlice.js';


export default class ContentWrapper {
	constructor(store) {
		this.store = store;
		this.component = null;
		this.children = [];
		useSelector(this, store, [ selectCategoryNames ]);
	}

	mount() {
		this.component = new Content();
		const categoryNames = this.selectCategoryNames();

		this.mountChildren(this.store, categoryNames);
	}

	update() {
		this.component.update();
		this.updateChildren();
	}

	mountChildren(store, categoryNames) {
		this.children = categoryNames.map(category => {
			return new Category(store, category);
		});
		this.children.forEach(elm => elm.mount());
	}

	updateChildren() {
		this.children.forEach(elm => elm.update());
	}
}