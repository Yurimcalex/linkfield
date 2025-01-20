import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { 
	selectLinksByCategory,
 	selectRemovedLinkId,
 	selectJustCreatedLink,
 	selectCreatedLinkId, selectEditedLink } from '../../../redux/linksSlice.js';
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
			this.linkForEditingSelected(linkId);
			this.changeLinkFormMode('editing');
		};
		this.selectCreatedLinkId = store.useSelector(selectCreatedLinkId);
		this.selectEditedLink = store.useSelector(selectEditedLink);
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

		const removedId = this.selectRemovedLinkId();
		if (removedId !== this.removedId) { // link was removed
			this.component.update(null, removedId);
			this.removedId = removedId;

		}

		const createdId = this.selectCreatedLinkId();
		if (createdId !== this.createdId) { // link was created
			this.component.update(null, null, this.selectJustCreatedLink());
			this.createdId = createdId;
		}

		const editedLink = this.selectEditedLink();
		if (editedLink !== this.editedLink) {
			if (editedLink.category === this.category) {
				this.component.update(null, null, null, editedLink);
			}
			this.editedLink = editedLink;
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


function hasSameValues(obj1, obj2) {
	for (let p in obj1) {
		if (obj1[p] != obj2[p]) return false;
	}
	return true;
}