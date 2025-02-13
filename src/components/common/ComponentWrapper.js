import Component from './Component.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { selectAction } from '../../redux/actionSlice.js';
import { selectLinkCategories } from '../../redux/linksSlice.js';
import { changeScreenSize, pickMenuCategory } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		useSelector(this, store, [ selectMenuCategory, selectIsSmallScreen, selectAction, selectLinkCategories ]);
		useDispatch(this, store, [ changeScreenSize, pickMenuCategory ]);

		this.updateActions = {
			'ui/categoryMenuToggled': true,
			'ui/screenSizeChanged': true,
			'links/linkCreated/fulfilled': true,
			'links/linksLoaded/fulfilled': true,
		};
	}

	mount() {
		this.categories = this.selectLinkCategories()
		this.component = new Component(this.changeScreenSize, this.pickMenuCategory);
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;

		if (action === 'links/linksLoaded/fulfilled') {
			this.component.remove();
			this.mount();
			return;
		}

		if (action === 'links/linkCreated/fulfilled') {
			const categories = this.selectLinkCategories();
			for (let category of categories) {
				if (!(this.categories.includes(category))) {
					this.component.update(null, null, category);
					this.categories = categories;
					return;
				}
			}
			
		} else {
			this.component.update(this.selectMenuCategory(), this.selectIsSmallScreen());
		}
	}
}