import Menu from './categoryMenu.js';
import { selectCategoryData } from '../redux/linksSlice.js';
import { selectMenuCategory } from '../redux/uiSlice.js';
import { menuCategorySelected } from '../redux/uiSlice.js';


export default class CategoryMenu {
	constructor(store) {
		this.selectCategories = store.useSelector(selectCategoryData);
		this.selectCategory = store.useSelector(selectMenuCategory);
		this.dispatch = store.useDispatch();
	}

	mount() {
		const categories = this.selectCategories();
		const category = this.selectCategory();
		const handleClick = (category) => this.dispatch(menuCategorySelected(category));
		this.component = new Menu(categories, category, handleClick);
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