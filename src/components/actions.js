import {
 menuCategorySelected,
 categoryMenuToggled,
 screenSizeChanged,
 settingsWindowToggled,
 linkFormModeChanged } from '../redux/uiSlice.js';
import { linkTypeSelected } from '../redux/filtersSlice.js';
import { linkRemoved, linkCreated, editedLinkIdSelected } from '../redux/linksSlice.js';


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

export const removeLink = (dispatch) =>
	(id) => dispatch(linkRemoved(id));

export const toggleSettingWindow = (dispatch) =>
	() => dispatch(settingsWindowToggled());

export const changeLinkFormMode = (dispatch) => 
	(mode) => dispatch(linkFormModeChanged(mode));

export const createLink = (dispatch) => 
	(link) => dispatch(linkCreated(link));

export const linkForEditingSelected = (dispatch) => 
	(id) => dispatch(editedLinkIdSelected(id));

export const editLink = (dispatch) => 
	(link) => dispatch(linkEdited(link));