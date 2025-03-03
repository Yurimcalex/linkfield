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
	OPEN_CATEGORY_MENU_BUTTON,
	SETTINGS_MENU,
	OPEN_SETTINGS_BUTTON,
	LINK_FORM,
	SETTINGS_WINDOW,
	theme,
	CLOSE_BUTTON,
	CHANGE_THEME_BUTTON,
	CONTENT_PLACEHOLDER,
	THEME_MENU,
	LOADING_COVER } from './classNames.js';


export const dom = {
	getContent: () => document.querySelector(`.${CONTENT}`),
	getContentPlaceholder: () => document.querySelector(`.${CONTENT_PLACEHOLDER}`),
	getCategory: (category) => document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`),
	getCategoryByElem: (target) => target.closest(`.${LINK_CATEGORY}`),
	getLinkList: (category) => document.querySelector(`.${LINK_LIST}[data-category="${category}"]`),
	getSettingsWindow: () => document.querySelector(`.${SETTINGS_WINDOW}`),
	getCloseButton: (target) => target.closest(`.${CLOSE_BUTTON}`),
	getLoadingCover: () => document.querySelector(`.${LOADING_COVER}`),

	linkForm: {
		get: () => document.querySelector(`.${LINK_FORM}`),
		getCategorySelect: (target) => target.querySelector(`select[name="category"]`),
		getTypesSelect: (target) => target.querySelector(`select[name="type"]`),
	},

	settingsMenu: {
		get: () => document.querySelector(`.${SETTINGS_MENU}`),
		getOpenButton: (target) => target.closest(`.${OPEN_SETTINGS_BUTTON}`),
		getOpenThemeMenuBtn: (target) => target.closest(`.${CHANGE_THEME_BUTTON}`)
	},

	link: {
		get: (target) => target.closest(`.${LINK_LIST_ITEM}`),
		getById: (target, id) => target.querySelector(`.${LINK_LIST_ITEM}[data-linkid="${id}"]`),
		getRemoveButton: (target) => target.closest(`.${REMOVE_BUTTON}`),
		getEditButton: (target) => target.closest(`.${EDIT_BUTTON}`),
		getLast: (target) => target.querySelector(`.${LINK_LIST_ITEM}:last-child`),
		getCurrentSelected: () => document.querySelector(`.${theme.LINK_SELECTED}`),
		getControls: (target) => target.querySelector(`.${LINK_CONTROLS}`),
		getType: (target) => target.querySelector(`.${LINK_TYPE}`),
		getTopic: (target) => target.querySelector(`.${LINK_TOPIC}`),
	},

	categoryHeader: {
		get: (target) => target.querySelector(`.${LINK_CATEGORY_HEADER}`),
		getById: (id) => document.getElementById(id),
		getSelect: (target) => target.querySelector('select'),
		getOptionByType: (target, type) => target.querySelector(`option[data-type="${type}"]`),
	},

	categoryMenu: {
		getMenu: () => document.querySelector(`.${CATEGORY_MENU}`),
		getItem: (target) => target.closest(`.${CATEGORY_MENU_ITEM}`),
		getHighlightedItem: (target) => target.querySelector(`.${theme.CATEGORY_MENU_ITEM_SELECTED}`),
		getItemByCategory: (target, category) => 
			target.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"]`),

		getItemTotal: (target, category) => 
			target.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"] a > span`),

		getOpener: () => document.querySelector(`.${OPEN_CATEGORY_MENU_BUTTON}`),
		getLastItem: (target) => target.querySelector(`.${CATEGORY_MENU_ITEM}:last-child`)
	},

	themeMenu: {
		get: () => document.querySelector(`.${THEME_MENU}`)
	}
};