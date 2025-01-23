import Menu from './Menu.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectCategoryData } from '../../redux/linksSlice.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { selectAction } from '../../redux/actionSlice.js';
import { clickOnCategoryMenu } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		this.categories = null;
		this.category = null;
		useSelector(this, store, [ selectCategoryData, selectMenuCategory, selectIsSmallScreen, selectAction ]);
		useDispatch(this, store, [ clickOnCategoryMenu ]);
		
		this.clickMenu = (category, event) => {
			const isSmallScreen = this.selectIsSmallScreen();
			this.clickOnCategoryMenu(category, isSmallScreen, event);
		}

		this.updateActions = {
			'ui/menuCategorySelected': true,
			'links/linkRemoved': true,
			'links/linkCreated': true
		};
	}

	mount() {
		const categories = this.selectCategoryData();
		this.component = new Menu(categories, this.selectCategoryData(), this.clickMenu);
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
				
			case 'links/linkRemoved':
			case 'links/linkCreated': {
				const categories = this.selectCategoryData();
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