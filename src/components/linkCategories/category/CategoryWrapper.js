import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { selectLinksByCategory } from '../../../redux/linksSlice.js';
import { selectLinkType } from '../../../redux/filtersSlice.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.store = store;
		this.category = category;
		this.selectLinks = store.useSelector(selectLinksByCategory);
		this.selectLinkType = store.useSelector(selectLinkType);
	}

	mount() {
		const links = this.selectLinks(this.category);
		this.component = new Category(this.category, links);
		this.links = links;
		this.linkType = this.selectLinkType(this.category);
		this.mountChild(this.store, this.category);

	}

	update() {
		const linkType = this.selectLinkType(this.category);
		if (linkType.category === this.category && linkType !== this.linkType) {
			this.component.update(linkType.type);
			this.linkType = linkType;
		}
		
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