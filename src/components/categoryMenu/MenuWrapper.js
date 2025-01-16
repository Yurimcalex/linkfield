import Menu from './Menu.js';
import { selectCategoryData } from '../../redux/linksSlice.js';
import { selectMenuCategory } from '../../redux/uiSlice.js';
import { clickCategoryMenu } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.selectCategories = store.useSelector(selectCategoryData);
		this.selectCategory = store.useSelector(selectMenuCategory);
		this.storeAction = clickCategoryMenu(store.useDispatch());
	}

	mount() {
		const categories = this.selectCategories();
		const category = this.selectCategory();
	
		this.component = new Menu(categories, category, this.storeAction);
		this.categories = categories;
		this.category = category;
	}

	update() {
		const category = this.selectCategory();
		if (category !== this.category) {
		 	this.component.update(category);
		 	this.category = category;
		}
	}
}