import { 
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK 
} from '../elements.js';


export function createCategoryMenuItem(category, itemId) {
	let html = '';
	html += `<li class="${CATEGORY_MENU_ITEM}">`;
		html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
			html += `<a class="${CATEGORY_MENU_LINK}" href=#${itemId}>${category}</a>`;
		html += '</h2>';
	html += '</li>';
	return html;
}