import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { useSelector, useDispatch } from '../../../redux/redux.js';
import { 
	selectLinksByCategory, selectJustCreatedLink, selectCreatedLinkId,
	selectEditedLink } from '../../../redux/linksSlice.js';
import { openLinkFormForEditing, removeLink } from '../../actions.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.store = store;
		this.category = category;
		this.component = null;
		this.child = null;
		this.links = null;
		this.createdId = null;
		this.editedLink = null;
		useSelector(this, store, [ selectLinksByCategory,
															 selectJustCreatedLink, selectCreatedLinkId, selectEditedLink ]);
		useDispatch(this, store, [ openLinkFormForEditing, removeLink ]);
	}

	mount() {
		const links = this.selectLinksByCategory(this.category);
		this.component = new Category( this.category, links, this.removeLink, this.openLinkFormForEditing );
		this.links = links;

		this.mountChild(this.store, this.category);
	}

	update(linkType, removedId) {
		// arrange category links by type
		if (linkType) this.component.update(linkType.type);
		// link was removed
		if (removedId) this.component.update(null, removedId);

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

		console.log(`${this.category} UPDATED!`);
	}

	mountChild(store, category) {
		this.child = new Header(store, category);
		this.child.mount();
	}

	updateChild() {
		this.child.update();
	}
}