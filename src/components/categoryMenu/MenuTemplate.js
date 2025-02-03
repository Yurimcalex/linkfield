import {
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK,
	CATEGORY_MENU_LINK_TOTAL,
	THEME_CATEGORY_MENU_ITEM,
	THEME_CATEGORY_MENU_ITEM_ADAPTIVE
} from '../classNames.js';


export function createItemTemplate(category, itemId, total) {
	let html = '';
	html += `<li class="${CATEGORY_MENU_ITEM} ${THEME_CATEGORY_MENU_ITEM} ${THEME_CATEGORY_MENU_ITEM_ADAPTIVE}" data-category="${category}">`;
		html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
			html += `<a class="${CATEGORY_MENU_LINK}" href=#${itemId}>`;
				html += `${category} `;
				html += `<span class=${CATEGORY_MENU_LINK_TOTAL}>${total}</span>`;
			html += '</a>';
		html += '</h2>';
	html += '</li>';
	return html;
}