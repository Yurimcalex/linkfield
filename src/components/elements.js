import { 
	CONTENT,
	LINK_CATEGORY,
	LINK_LIST,
	LINK_LIST_ITEM,
	LINK_CONTROLS,
	REMOVE_BUTTON,
	EDIT_BUTTON } from './classNames.js';


export const getContent = () => document.querySelector(`.${CONTENT}`);

export const getCategory = (category) => 
	document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`);

export const getLinkList = (category) =>
	document.querySelector(`.${LINK_LIST}[data-category="${category}"]`);

export const getLinkRemoveButton = (target) => target.closest(`.${REMOVE_BUTTON}`);

export const getLinkEditButton = (target) => target.closest(`.${EDIT_BUTTON}`);

export const getLink = (target) => target.closest(`.${LINK_LIST_ITEM}`);

export const getCurrentSelectedLink = () => 
	document.querySelector(`.${LINK_LIST_ITEM}.current`);

export const getLinkControls = (target) => target.querySelector(`.${LINK_CONTROLS}`); 