import Menu from './Menu.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectCategoryData } from '../../redux/linksSlice.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { clickOnCategoryMenu } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		this.categories = null;
		this.category = null;
		useSelector(this, store, [ selectCategoryData, selectMenuCategory, selectIsSmallScreen ]);
		useDispatch(this, store, [ clickOnCategoryMenu ]);
		
		this.clickMenu = (category, event) => {
			const isSmallScreen = this.selectIsSmallScreen();
			this.clickOnCategoryMenu(category, isSmallScreen, event);
		}
	}

	mount() {
		const categories = this.selectCategoryData();
		const category = this.selectMenuCategory();
	
		this.component = new Menu(categories, category, this.clickMenu);
		this.categories = categories;
		this.category = category;
	}

	update() {
		// select item in category menu
		const category = this.selectMenuCategory();
		if (category !== this.category) {
		 	this.component.update(category);
		 	this.category = category;
		}

		// remove item in category list
		const categories = this.selectCategoryData();
		for (let category in this.categories) {
			const prev = this.categories[category];
			const curr = categories[category];	
			if (prev !== curr) {
				this.component.update(null, { category, total: curr || 0 });
			}
		}
		this.categories = categories;
	}
}