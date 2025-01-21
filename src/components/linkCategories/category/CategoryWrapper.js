import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { useSelector, useDispatch } from '../../../redux/redux.js';
import { 
	selectLinksByCategory, selectRemovedLinkId, selectJustCreatedLink, selectCreatedLinkId,
	selectEditedLink } from '../../../redux/linksSlice.js';
import { selectLinkType } from '../../../redux/filtersSlice.js';
import { openLinkFormForEditing, removeLink } from '../../actions.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.store = store;
		this.category = category;
		this.component = null;
		this.child = null;
		this.links = null;
		this.linkType = null;
		this.removedId = null;
		this.createdId = null;
		this.editedLink = null;
		useSelector(this, store, [ selectLinksByCategory, selectLinkType, selectRemovedLinkId,
															 selectJustCreatedLink, selectCreatedLinkId, selectEditedLink ]);
		useDispatch(this, store, [ openLinkFormForEditing, removeLink ]);
	}

	mount() {
		const links = this.selectLinksByCategory(this.category);
		this.component = new Category( this.category, links, this.removeLink, this.openLinkFormForEditing );
		this.links = links;

		this.mountChild(this.store, this.category);
	}

	update() {
		// arrange category links by type
		const linkType = this.selectLinkType(this.category);
		if (linkType.category === this.category && linkType !== this.linkType) {
			this.component.update(linkType.type);
			this.linkType = linkType;
		}

		// link was removed
		const removedId = this.selectRemovedLinkId();
		if (removedId !== this.removedId) {
			this.component.update(null, removedId);
			this.removedId = removedId;
		}

		// link was created
		const createdId = this.selectCreatedLinkId();
		const createdLink = this.selectJustCreatedLink();
		if (createdId !== this.createdId && createdLink && createdLink.category === this.category) {
			this.component.update(null, null, createdLink);
			this.createdId = createdId;
		}

		// link was edited
		const editedLink = this.selectEditedLink();
		if (editedLink && editedLink !== this.editedLink) {
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