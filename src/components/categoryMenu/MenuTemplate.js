import {
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK 
} from '../classNames.js';


export function createItemTemplate(category, itemId, total) {
	let html = '';
	html += `<li class="${CATEGORY_MENU_ITEM}" data-category="${category}">`;
		html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
			html += `<a class="${CATEGORY_MENU_LINK}" href=#${itemId}>`;
				html += `${category} `;
				html += `<span>${total}</span>`;
			html += '</a>';
		html += '</h2>';
	html += '</li>';
	return html;
}