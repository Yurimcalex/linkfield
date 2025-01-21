import Header from './Header.js';
import { useSelector, useDispatch } from '../../../../redux/redux.js';
import { selectLinkTypesByCategory } from '../../../../redux/linksSlice.js';
import { pickCategoryLinkType } from '../../../actions.js';


export default class HeaderWrapper {
	constructor(store, category) {
		this.category = category;
		this.component = null;
		this.linkTypes = null;
		useSelector(this, store, [ selectLinkTypesByCategory ]);
		useDispatch(this, store, [ pickCategoryLinkType ])
	}

	mount() {
		const linkTypes = this.selectLinkTypesByCategory(this.category);
		this.component = new Header(this.category, linkTypes, this.pickCategoryLinkType);
		this.linkTypes = linkTypes;
		
	}

	update() {
		// remove list item
		const linkTypes = this.selectLinkTypesByCategory(this.category);
		if (linkTypes.length < this.linkTypes.length) {
			for (let type of this.linkTypes) {
				if (!linkTypes.includes(type)) {
					this.component.update(type);
					this.linkTypes = linkTypes;
					break;
				}
			}
		}
	}
}