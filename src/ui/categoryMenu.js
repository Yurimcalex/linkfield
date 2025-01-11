import { 
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK 
} from './elements.js';

import { elements } from './elements.js';
import { replaceSpace } from './utils.js';

const { categoryMenu: menu } = elements;


export function createCategoryMenuContent(data) {
	menu.innerHTML = createContent(data);
}


function createContent(items) {
	let html = '';
	for (let item of items) {
		html += `<li class="${CATEGORY_MENU_ITEM}">`;
			html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
				html += `<a class="${CATEGORY_MENU_LINK}" href=${`#` + replaceSpace(item)}>${item}</a>`;
			html += '</h2>';
		html += '</li>';
	}
	return html;
}