import LinkFrom from './LinkForm.js';
import { useSelector, useDispatch } from '../../../redux/redux.js';
import { selectLinkCategories, selectLinkTypes, selectLinkForEdit } from '../../../redux/linksSlice.js';
import { selectLinkFormMode } from '../../../redux/uiSlice.js';
import { selectAction } from '../../../redux/actionSlice.js';
import { createNewLink, editPickedLink } from '../../actions.js';


export default class LinkFromWrapper {
	constructor(store) {
		this.component = null;
		this.mode = null;
		useSelector(this, store, [ selectLinkCategories, selectLinkTypes,
															 selectLinkFormMode, selectLinkForEdit, selectAction ]);
		useDispatch(this, store, [ createNewLink, editPickedLink ]);

		this.updateActions = {
			'ui/linkFormModeChanged': true
		};
	}

	mount() {
		const categories = this.selectLinkCategories();
		const types = this.selectLinkTypes();
		this.component = new LinkFrom(categories, types, this.createNewLink, this.editPickedLink);
	}

	update() {
		const action = this.selectAction();
		if (action in this.updateActions) {
			this.component.update(this.selectLinkFormMode(), this.selectLinkForEdit());
		}
	}
}