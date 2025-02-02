import Content from './Content.js';
import Category from './category/CategoryWrapper.js';
import { useSelector } from '../../redux/redux.js';
import { 
	selectLinkCategories, selectRemovedLinkId,
	selectRemovedLinkCategory, selectCreatedLink, selectEditedLink, selectLoadingStatus } from '../../redux/linksSlice.js';
import { selectLinkType } from '../../redux/filtersSlice.js';
import { selectAction } from '../../redux/actionSlice.js';


export default class ContentWrapper {
	constructor(store) {
		this.store = store;
		this.component = null;
		this.children = [];
		useSelector(this, store, [ selectLinkCategories, selectAction, selectLinkType, selectRemovedLinkId,
		                           selectRemovedLinkCategory, selectCreatedLink, selectEditedLink, selectLoadingStatus ]);

		this.updateActions = {
			'filters/linkTypeSelected': true,
			'links/linkRemoved/fulfilled': true,
			'links/linkCreated/fulfilled': true,
			'links/linkEdited/fulfilled': true
		};
	}

	mount() {
		const categories = this.selectLinkCategories().sort();
		this.component = new Content();
		this.mountChildren(this.store, this.selectLinkCategories().sort());
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;
		this.component.update();
		this.updateChildren(action);
	}

	mountChildren(store, categoryNames) {
		this.children = categoryNames.map(category => {
			return new Category(store, category);
		});
		this.children.forEach(elm => elm.mount());
	}

	updateChildren(action) {
		const update = (dataCategory, data) => {
			for (let child of this.children) {
				if (child.category === dataCategory) {
					return child.update(data);
				}
			}
		};

		switch (action) {
			case 'filters/linkTypeSelected': {
				const linkType = this.selectLinkType();
				return update(linkType.category, { linkType });
			}
			case 'links/linkRemoved/fulfilled': {
				const removedLinkId = this.selectRemovedLinkId();
				const category = this.selectRemovedLinkCategory();
				return update(category, { removedLinkId });
			}
			case 'links/linkCreated/fulfilled': {
				const createdLinkData = this.selectCreatedLink();
				return update(createdLinkData.category, { createdLinkData });
			}
			case 'links/linkEdited/fulfilled': {
				const editedLinkData = this.selectEditedLink();
				return update(editedLinkData.category, { editedLinkData });
			}
		}
	}
}