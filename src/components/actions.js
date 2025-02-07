import { menuCategorySelected, categoryMenuToggled, screenSizeChanged, settingsWindowToggled,
	linkFormModeChanged } from '../redux/uiSlice.js';

import { linkTypeSelected } from '../redux/filtersSlice.js';
import { linkRemoved, linkCreated, editedLinkIdSelected, linkEdited } from '../redux/linksSlice.js';
import { userLogged } from '../redux/userSlice.js';


export const loginUser = (dispatch) => 
	(email, password) => dispatch(userLogged(email, password));


export const pickMenuCategory = (dispatch) =>
	(category) => dispatch(menuCategorySelected(category));

export const toggleMenuOpener = (dispatch) =>
	() => dispatch(categoryMenuToggled());

export const changeScreenSize = (dispatch) =>
	(isSmall) => dispatch(screenSizeChanged(isSmall));

export const pickCategoryLinkType = (dispatch) =>
	(payload) => dispatch(linkTypeSelected(payload));

export const removeLink = (dispatch) =>
	(id) => dispatch(linkRemoved(id));

export const clickOnCategoryMenu = (dispatch) =>
	(category, isSmallScreen, event) => {
		dispatch(menuCategorySelected(category));
		if (isSmallScreen) {
			event.preventDefault();
			dispatch(categoryMenuToggled());
		}
	};

export const openLinkFormForEditing = (dispatch) =>
	(linkId) => {
		dispatch(settingsWindowToggled());
		dispatch(editedLinkIdSelected(linkId));
		dispatch(linkFormModeChanged('editing'));
	};

export const openLinkFormForCreation = (dispatch) =>
	() => {
		dispatch(settingsWindowToggled());
		dispatch(linkFormModeChanged('creation'));
	};

export const closeSettingsWindow = (dispatch) => 
	() => {
		dispatch(settingsWindowToggled());
		dispatch(linkFormModeChanged(''));
	};

export const createNewLink = (dispatch) => 
	(linkData) => {
		dispatch(settingsWindowToggled());
		dispatch(linkFormModeChanged(''));
		dispatch(linkCreated(linkData));
	};

export const editPickedLink = (dispatch) => 
	(linkData) => {
		dispatch(settingsWindowToggled());
		dispatch(linkFormModeChanged(''));
		dispatch(linkEdited(linkData));
	};