import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { selectLinksByCategory } from '../../../redux/linksSlice.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.store = store;
		this.category = category;
		this.selectLinks = store.useSelector(selectLinksByCategory);
	}

	mount() {
		const links = this.selectLinks(this.category);
		this.component = new Category(this.category, links);
		this.links = links;
		this.mountChild(this.store, this.category);
	}

	update() {
		this.component.update();
		this.updateChild();
	}

	mountChild(store, category) {
		this.child = new Header(store, category);
		this.child.mount();
	}

	updateChild() {
		this.child.update();
	}
}