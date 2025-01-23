import Content from './Content.js';
import Category from './category/CategoryWrapper.js';
import { useSelector } from '../../redux/redux.js';
import { 
	selectCategoryNames,
	selectRemovedLinkId, selectRemovedLinkCategory, selectJustCreatedLink } from '../../redux/linksSlice.js';
import { selectLinkType } from '../../redux/filtersSlice.js';
import { selectAction } from '../../redux/actionSlice.js';


export default class ContentWrapper {
	constructor(store) {
		this.store = store;
		this.component = null;
		this.children = [];
		useSelector(this, store, [ selectCategoryNames, selectAction, selectLinkType, selectRemovedLinkId,
		                           selectRemovedLinkCategory, selectJustCreatedLink ]);

		this.updateActions = {
			'filters/linkTypeSelected': true,
			'links/linkRemoved': true,
			'links/linkCreated': true,
			'links/linkEdited': true
		};
	}

	mount() {
		this.component = new Content();
		this.mountChildren(this.store, this.selectCategoryNames());
	}

	update() {
		const action = this.selectAction();
		console.log(`ACTION ${action} <---`)
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
		switch (action) {
			case 'filters/linkTypeSelected': {
				const linkType = this.selectLinkType();
				for (let child of this.children) {
					if (child.category === linkType.category) {
						child.update(linkType);
						return;
					}
				}
			}

			case 'links/linkRemoved': {
				const removedId = this.selectRemovedLinkId();
				const category = this.selectRemovedLinkCategory();
				for (let child of this.children) {
					if (child.category === category) {
						child.update(null, removedId);
						return;
					}
				}
			}

			case 'links/linkCreated': {
				const linkData = this.selectJustCreatedLink();
				for (let child of this.children) {
					if (child.category === linkData.category) {
						child.update(null, null, linkData);
						return;
					}
				}
			}
		}
	}
}