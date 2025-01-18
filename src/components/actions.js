import { menuCategorySelected, categoryMenuToggled, screenSizeChanged } from '../redux/uiSlice.js';
import { linkTypeSelected } from '../redux/filtersSlice.js';


export const clickCategoryMenu = (dispatch) =>
	(category) => dispatch(menuCategorySelected(category));

export const clickMenuOpener = (dispatch) =>
	() => dispatch(categoryMenuToggled());

export const changeScreenSize = (dispatch) =>
	(isSmall) => dispatch(screenSizeChanged(isSmall));

export const clickCategoryMenuOnSmallScreen = (dispatch) =>
	() => dispatch(categoryMenuToggled());

export const selectCategoryLinkType = (dispatch) =>
	(payload) => dispatch(linkTypeSelected(payload));