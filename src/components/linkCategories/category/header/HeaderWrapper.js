import Header from './Header.js';
import { selectLinkTypesByCategory } from '../../../../redux/linksSlice.js';
import { selectLinkType } from '../../../../redux/filtersSlice.js';
import { selectCategoryLinkType } from '../../../actions.js';


export default class HeaderWrapper {
	constructor(store, category) {
		this.selectLinkTypes = store.useSelector(selectLinkTypesByCategory);
		this.selectLinkType = store.useSelector(selectLinkType);
		this.setLinkType = selectCategoryLinkType(store.useDispatch());
		this.category = category;
	}

	mount() {
		const linkTypes = this.selectLinkTypes(this.category);
		const linkType = this.selectLinkType(this.category);
		this.component = new Header(this.category, linkTypes, this.setLinkType);
		this.linkTypes = linkTypes;
		this.linkType = linkType;
	}

	update() {
		this.component.update();
	}
}