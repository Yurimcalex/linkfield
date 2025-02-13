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
			'ui/linkFormModeChanged': true,
			'links/linkRemoved/fulfilled': true,
			'links/linkCreated/fulfilled': true,
			'links/linkEdited/fulfilled': true,
			'links/linksLoaded/fulfilled': true
		};
	}

	mount() {
		const categories = this.selectLinkCategories();
		const types = this.selectLinkTypes();
		this.component = new LinkFrom(categories, types, this.createNewLink, this.editPickedLink);
		this.categories = categories;
		this.types = types;
	}

	update() {
		const action = this.selectAction();
		switch (action) {
			case 'links/linksLoaded/fulfilled': {
				this.component.remove();
				this.mount();
				return;
			}

			case 'ui/linkFormModeChanged': {
				this.component.update(this.selectLinkFormMode(), this.selectLinkForEdit());
				return;
			}
				
			case 'links/linkRemoved/fulfilled':
			case 'links/linkCreated/fulfilled':
			case 'links/linkEdited/fulfilled': {
				const categories = this.selectLinkCategories();
				const types = this.selectLinkTypes();
				this.component.update(null, null, { categories, types })
				return;
			}
		}
	}
}