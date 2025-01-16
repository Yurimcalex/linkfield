import { menuCategorySelected } from '../redux/uiSlice.js';

export const clickCategoryMenu = (dispatch) =>
	(category) => dispatch(menuCategorySelected(category)); 