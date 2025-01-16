import Menu from './categoryMenu.js';
import { selectCategoryData } from '../redux/linksSlice.js';

export const categoryMenu = {
	component: null,

	mount(store) {
		const selectData = store.useSelector(selectCategoryData);
		this.component = new Menu(selectData());
	},

	update(store) {
		
	}
};