import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { selectLinksByCategory, selectRemovedLinkId, selectJustCreatedLink } from '../../../redux/linksSlice.js';
import { selectLinkType } from '../../../redux/filtersSlice.js';
import { removeLink, toggleSettingWindow, changeLinkFormMode, linkForEditingSelected } from '../../actions.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.store = store;
		this.category = category;
		this.selectLinks = store.useSelector(selectLinksByCategory);
		this.selectLinkType = store.useSelector(selectLinkType);
		this.selectRemovedLinkId = store.useSelector(selectRemovedLinkId);
		this.removeLink = removeLink(store.useDispatch());
		this.selectJustCreatedLink = store.useSelector(selectJustCreatedLink);
		this.toggleSettingWindow = toggleSettingWindow(store.useDispatch());
		this.changeLinkFormMode = changeLinkFormMode(store.useDispatch());
		this.linkForEditingSelected = linkForEditingSelected(store.useDispatch());
		this.openLinkFormForEditing = (linkId) => {
			this.toggleSettingWindow();
			this.changeLinkFormMode('editing');
			this.linkForEditingSelected(linkId);
		};
	}

	mount() {
		const links = this.selectLinks(this.category);
		this.component = new Category(
			this.category, links,
			this.removeLink,
			this.openLinkFormForEditing
		);
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

		const links = this.selectLinks(this.category);
		if (links.length < this.links.length) { // link was removed
			this.component.update(null, this.selectRemovedLinkId());
			this.links = links;
		}

		if (links.length > this.links.length) { // link was created
			this.component.update(null, null, this.selectJustCreatedLink());
			this.links = links;
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