import { replaceSpace } from '../ui/utils.js';


       const MENU_PANEL = 					     'menu-panel';
export const CATEGORY_MENU =             'category-menu';            // category selection menu element class name
export const CATEGORY_MENU_ITEM =        `${CATEGORY_MENU}-item`;
export const CATEGORY_MENU_HEADER =      `${CATEGORY_MENU}-header`;
export const CATEGORY_MENU_LINK =        `${CATEGORY_MENU}-content`;
export const OPEN_CATEGORY_MENU_BUTTON = 'menu-opener';


export const CONTENT =        'content';
export const LINK_CATEGORY =  'link-category';
export const LINK_CATEGORY_HEADER = 'link-category-header';
export const LINK_LIST =      'link-list';
export const LINK_LIST_ITEM = 'link-list-item';
export const LINK_TYPE =      'link-type';
export const LINK_TOPIC =     'link-topic';
export const LINK_CONTROLS =  'link-controls';
export const EDIT_BUTTON =    'edit-btn';
export const REMOVE_BUTTON =  'remove-btn';


export const SETTINGS_MENU = 'settings-menu';
export const SETTINGS_WINDOW = 'settings-window';
       const SET_LINK_WINDOW = 'link-creator';
export const CLOSE_BUTTON =    'close-btn';
export const LINK_FORM =       'link-form';


export const OPEN_SETTINGS_BUTTON = 'link-creator-opener';

const LOADING_COVER = 'loading-cover';


const selectors = {
	permanentElements: {
		categoryMenu:       `.${CATEGORY_MENU}`,
		content:            `.${CONTENT}`,
		categorySelect:     `.${SET_LINK_WINDOW} select[name="category"]`,
		typeSelect:         `.${SET_LINK_WINDOW} select[name="type"]`,
		settingsWindow:     `.${SETTINGS_WINDOW}`,
		linkForm:           `.${LINK_FORM}`,
		openSettingsButton: `.${OPEN_SETTINGS_BUTTON}`,
		openCategoryMenuButton: `.${OPEN_CATEGORY_MENU_BUTTON}`,
	},

	dynamicElements: {
		linkList: function (category) { return `ul[data-category="${category}"]`; },
		linkType: function () { return `.${LINK_TYPE}`; },
		linkTopic: function () { return `.${LINK_TOPIC}`; },
		lastListItem: function () { return `.${LINK_LIST_ITEM}:last-child`; },
		linkControls: function () { return `.${LINK_CONTROLS}`; },
		categoryMenuLink: function (category) { return `a[href="#${replaceSpace(category)}"]`; },
		linkArranger: function () { return `select[name="Arrange-by-type"]`; },
		categoryMenuLinkCounter: function (category) { return `a[href="#${replaceSpace(category)}"] > span`; },
		categoryHeaderSelect: function (category) { return `[id="${replaceSpace(category)}"] select`; }
	}
};


export const elements = { select: getDynamicElement };
getPermanentElements();


function getPermanentElements() {
	for (let key in selectors.permanentElements) {
		elements[key] = document.querySelector(selectors.permanentElements[key]);
	}
}

function getDynamicElement(container, elementName, data) {
	const getSelector = selectors.dynamicElements[elementName];
	return container.querySelector(getSelector(data));
}