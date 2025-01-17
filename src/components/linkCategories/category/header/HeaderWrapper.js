import Header from './Header.js';
import { selectLinkTypesByCategory } from '../../../../redux/linksSlice.js';


export default class HeaderWrapper {
	constructor(store, category) {
		this.selectLinkTypes = store.useSelector(selectLinkTypesByCategory);
		this.category = category;
	}

	mount() {
		const linkTypes = this.selectLinkTypes(this.category);
		this.component = new Header(this.category, linkTypes);
		this.linkTypes = linkTypes;
	}

	update() {
		this.component.update();
	}
}