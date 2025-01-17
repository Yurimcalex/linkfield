import Category from './Category.js';
import { selectLinksByCategory } from '../../../redux/linksSlice.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.category = category;
		this.selectLinks = store.useSelector(selectLinksByCategory);
	}

	mount() {
		const links = this.selectLinks(this.category);
		this.component = new Category(this.category, links);
		this.links = links;
	}

	update() {
		this.component.update();
	}
}