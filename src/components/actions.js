import { menuCategorySelected, categoryMenuToggled } from '../redux/uiSlice.js';

export const clickCategoryMenu = (dispatch) =>
	(category) => dispatch(menuCategorySelected(category));

export const clickMenuOpener = (dispatch) =>
	() => dispatch(categoryMenuToggled());