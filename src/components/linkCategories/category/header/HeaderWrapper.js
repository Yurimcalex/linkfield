import Header from './Header.js';
import { selectLinkTypesByCategory } from '../../../../redux/linksSlice.js';
import { selectLinkType } from '../../../../redux/filtersSlice.js';
import { pickCategoryLinkType } from '../../../actions.js';


export default class HeaderWrapper {
	constructor(store, category) {
		this.selectLinkTypes = store.useSelector(selectLinkTypesByCategory);
		this.selectLinkType = store.useSelector(selectLinkType);
		this.pickLinkType = pickCategoryLinkType(store.useDispatch());
		this.category = category;
	}

	mount() {
		const linkTypes = this.selectLinkTypes(this.category);
		const linkType = this.selectLinkType(this.category);
		this.component = new Header(this.category, linkTypes, this.pickLinkType);
		this.linkTypes = linkTypes;
		this.linkType = linkType;
	}

	update() {
		const linkTypes = this.selectLinkTypes(this.category);

		// remove list item
		if (linkTypes.length < this.linkTypes.length) {
			for (let type of this.linkTypes) {
				if (!linkTypes.includes(type)) {
					this.component.update(type);
					this.linkTypes = linkTypes;
					break;
				}
			}
		}
		//this.component.update();
	}
}