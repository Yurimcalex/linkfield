const MENU_PANEL = 					 'menu-panel';
const CATEGORY_MENU =        'category-menu';
export const CATEGORY_MENU_ITEM =   `${CATEGORY_MENU}-item`;
export const CATEGORY_MENU_HEADER = `${CATEGORY_MENU}-header`;
export const CATEGORY_MENU_LINK =   `${CATEGORY_MENU}-content`;
const OPEN_CATEGORY_MENU_BUTTON = 'menu-opener';


const CONTENT =        'content';
export const LINK_CATEGORY =  'link-category';
export const LINK_LIST =      'link-list';
const LINK_LIST_ITEM = 'link-list-item';
const LINK_TYPE =      'link-type';
const LINK_TOPIC =     'link-topic';
const LINK_CONTROLS =  'link-controls';
const EDIT_BUTTON =    'edit-btn';
const REMOVE_BUTTON =  'remove-btn';


const SETTINGS_WINDOW = 'settings-window';
const SET_LINK_WINDOW = 'link-creator';
const CLOSE_BUTTON =    'close-btn';
const LINK_FORM =       'link-form';


const OPEN_SETTINGS_BUTTON = 'link-creator-opener';

const LOADING_COVER = 'loading-cover';


const selectors = {
	permanentElements: {
		categoryMenu:   `.${CATEGORY_MENU}`,
		content:        `.${CONTENT}`,
		categorySelect: `.${SET_LINK_WINDOW} select[name="category"]`,
		// typeSelect:     `.${SET_LINK_WINDOW} select[name="type"]`;
	},

	dynamicElements: {
		// linkList: function (category) { return `ul[data-category="${category}"]` }
	}
};


export const elements = {};
getPermanentElements();


function getPermanentElements() {
	for (let key in selectors.permanentElements) {
		elements[key] = document.querySelector(selectors.permanentElements[key]);
	}
}