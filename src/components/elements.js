import { 
	CONTENT,
	LINK_CATEGORY,
	LINK_LIST,
	LINK_LIST_ITEM,
	LINK_CONTROLS,
	REMOVE_BUTTON,
	EDIT_BUTTON,
	LINK_TYPE,
	LINK_TOPIC,
	LINK_CATEGORY_HEADER } from './classNames.js';

export const dom = {
	getContent: () => document.querySelector(`.${CONTENT}`),

	getCategory: (category) => document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`),

	getLinkList: (category) => document.querySelector(`.${LINK_LIST}[data-category="${category}"]`),

	getLinkRemoveButton: (target) => target.closest(`.${REMOVE_BUTTON}`),

	getLinkEditButton: (target) => target.closest(`.${EDIT_BUTTON}`),

	getLink: (target) => target.closest(`.${LINK_LIST_ITEM}`),

	getLinkById: (target, id) => target.querySelector(`.${LINK_LIST_ITEM}[data-linkid="${id}"]`),

	getLastLink: (target) => target.querySelector(`.${LINK_LIST_ITEM}:last-child`),
	
	getCurrentSelectedLink: () => document.querySelector(`.${LINK_LIST_ITEM}.current`),
	
	getLinkControls: (target) => target.querySelector(`.${LINK_CONTROLS}`),
	
	getLinkType: (target) => target.querySelector(`.${LINK_TYPE}`),
	
	getLinkTopic: (target) => target.querySelector(`.${LINK_TOPIC}`),

	getCategoryHeader: (target) => target.querySelector(`.${LINK_CATEGORY_HEADER}`),

	getSelect: (target) => target.querySelector('select'),

	getOptionByType: (target, type) => target.querySelector(`option[data-type="${type}"]`),
};