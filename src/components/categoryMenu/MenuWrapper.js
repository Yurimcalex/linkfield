import Menu from './Menu.js';
import { selectCategoryData } from '../../redux/linksSlice.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { clickCategoryMenu, clickCategoryMenuOnSmallScreen } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.selectCategories = store.useSelector(selectCategoryData);
		this.selectCategory = store.useSelector(selectMenuCategory);

		this.storeAction = (category, event) => {
			const isSmallScreen = store.useSelector(selectIsSmallScreen)();
			clickCategoryMenu(store.useDispatch())(category);
			if (isSmallScreen) {
				event.preventDefault();
				clickCategoryMenuOnSmallScreen(store.useDispatch())();
			}
		}
	}

	mount() {
		const categories = this.selectCategories();
		const category = this.selectCategory();
	
		this.component = new Menu(categories, category, this.storeAction);
		this.categories = categories;
		this.category = category;
	}

	update() {
		// select item in category menu
		const category = this.selectCategory();
		if (category !== this.category) {
		 	this.component.update(category);
		 	this.category = category;
		}

		// remove item in category list
		const categories = this.selectCategories();
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