import Content from './Content.js';
import Category from './category/CategoryWrapper.js';
import Placeholder from './placeholder/PlaceholderWrapper.js';
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
			'links/linkEdited/fulfilled': true,
			'links/linksLoaded/fulfilled': true
		};
	}

	mount() {
		const categories = this.selectLinkCategories().sort();
		this.component = new Content();
		this.mountChildren(this.store, this.selectLinkCategories().sort());
		this.categories = categories;

		this.child = new Placeholder(this.store, categories.length);
		this.child.mount(categories.length);
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;
		if (action === 'links/linksLoaded/fulfilled') {
			this.component.remove();
			this.mount();
			return;
		}

		this.component.update();
		this.updateChildren(action);
		this.child.update(this.selectLinkCategories().length);
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
				const categories = this.selectLinkCategories();
				for (let category of categories) {
					if (!(this.categories.includes(category))) {
						const newCategory = new Category(this.store, category);
						newCategory.mount();
						this.children.push(newCategory);
						this.categories = categories;
						return;
					}
				}
				
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