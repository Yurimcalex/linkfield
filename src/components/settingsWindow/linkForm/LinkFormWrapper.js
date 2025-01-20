import LinkFrom from './LinkForm.js';
import { selectCategoryNames, selectLinkTypes } from '../../../redux/linksSlice.js';


export default class LinkFromWrapper {
	constructor(store) {
		this.selectCategoryNames = store.useSelector(selectCategoryNames);
		this.selectLinkTypes = store.useSelector(selectLinkTypes);
	}

	mount() {
		const categories = this.selectCategoryNames();
		const types = this.selectLinkTypes();
		this.component = new LinkFrom(categories, types);
		this.categories = categories;
		this.types = types;
	}

	update() {
		this.component.update();
	}
}