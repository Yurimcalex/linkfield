import Content from './Content.js';
import Category from './category/CategoryWrapper.js';
import { selectAllLinksId, selectCategoryNames } from '../../redux/linksSlice.js';


export default class ContentWrapper {
	constructor(store) {
		this.store = store;
		this.selectLinksId = store.useSelector(selectAllLinksId);
		this.selectCategoryNames = store.useSelector(selectCategoryNames);
		this.children = [];
	}

	mount() {
		this.component = new Content();
		this.linksId = this.selectLinksId();
		this.categoryNames = this.selectCategoryNames();

		this.mountChildren(this.store, this.categoryNames);
	}

	update() {
		const linksId = this.selectLinksId();
		console.log(linksId);
		this.updateChildren();
	}

	mountChildren(store, categoryNames) {
		this.children = categoryNames.map(category => {
			return new Category(store, category);
		});
		this.children.forEach(elm => elm.mount());
	}

	updateChildren() {

	}
}