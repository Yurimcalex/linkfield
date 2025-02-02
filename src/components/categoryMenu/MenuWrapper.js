import Menu from './Menu.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectCountLinksByCategory } from '../../redux/linksSlice.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { selectAction } from '../../redux/actionSlice.js';
import { clickOnCategoryMenu } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		this.categories = null;
		this.category = null;
		useSelector(this, store, [ selectCountLinksByCategory, selectMenuCategory, selectIsSmallScreen, selectAction ]);
		useDispatch(this, store, [ clickOnCategoryMenu ]);
		
		this.clickMenu = (category, event) => {
			const isSmallScreen = this.selectIsSmallScreen();
			this.clickOnCategoryMenu(category, isSmallScreen, event);
		}

		this.updateActions = {
			'ui/menuCategorySelected': true,
			'links/linkRemoved/fulfilled': true,
			'links/linkCreated/fulfilled': true,
			'links/linkEdited/fulfilled': true
		};
	}

	mount() {
		const categories = this.selectCountLinksByCategory();
		this.component = new Menu(categories, this.selectMenuCategory(), this.clickMenu);
		this.categories = categories;
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;

		switch (action) {
			case 'ui/menuCategorySelected': {
				this.component.update(this.selectMenuCategory());
				return;
			}
				
			case 'links/linkRemoved/fulfilled':
			case 'links/linkCreated/fulfilled':
			case 'links/linkEdited/fulfilled': {
				const categories = this.selectCountLinksByCategory();
				for (let category in this.categories) {
					const prev = this.categories[category];
					const curr = categories[category];	
					if (prev !== curr) {
						this.component.update(null, { category, total: curr || 0 });
					}
				}
				this.categories = categories;
				return;
			}
		}
	}
}