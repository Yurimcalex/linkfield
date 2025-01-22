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
	LINK_CATEGORY_HEADER,
	CATEGORY_MENU,
	CATEGORY_MENU_ITEM,
	OPEN_CATEGORY_MENU_BUTTON } from './classNames.js';

export const dom = {
	getContent: () => document.querySelector(`.${CONTENT}`),

	getCategory: (category) => document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`),

	getCategoryByElem: (target) => target.closest(`.${LINK_CATEGORY}`),

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

	getCategoryHeaderById: (id) => document.getElementById(id),

	getSelect: (target) => target.querySelector('select'),

	getOptionByType: (target, type) => target.querySelector(`option[data-type="${type}"]`),

	categoryMenu: {
		getMenu: () => document.querySelector(`.${CATEGORY_MENU}`),
		getItem: (target) => target.closest(`.${CATEGORY_MENU_ITEM}`),
		getHighlightedItem: (target) => target.querySelector(`.${CATEGORY_MENU_ITEM}.highlight`),
		getItemByCategory: (target, category) => 
			target.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"]`),
		getItemTotal: (target, category) => 
			target.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"] a > span`),
		getOpener: () => document.querySelector(`.${OPEN_CATEGORY_MENU_BUTTON}`)
	},
};