import LinkFrom from './LinkForm.js';
import { useSelector, useDispatch } from '../../../redux/redux.js';
import { selectCategoryNames, selectLinkTypes, selectEditingLink } from '../../../redux/linksSlice.js';
import { selectLinkFormMode } from '../../../redux/uiSlice.js';
import { createNewLink, editPickedLink } from '../../actions.js';


export default class LinkFromWrapper {
	constructor(store) {
		this.component = null;
		this.mode = null;
		useSelector(this, store, [ selectCategoryNames, selectLinkTypes, selectLinkFormMode, selectEditingLink ]);
		useDispatch(this, store, [ createNewLink, editPickedLink ]);
	}

	mount() {
		const categories = this.selectCategoryNames();
		const types = this.selectLinkTypes();
		this.component = new LinkFrom(categories, types, this.createNewLink, this.editPickedLink);
	}

	update() {
		const mode = this.selectLinkFormMode();
		if (mode !== this.mode) {
			this.component.update(mode, this.selectEditingLink());
			this.mode = mode;
		}
	}
}