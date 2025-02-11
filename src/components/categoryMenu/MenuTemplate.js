import {
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK,
	CATEGORY_MENU_LINK_TOTAL,
	theme
} from '../classNames.js';


export function createItemTemplate(category, itemId, total) {
	let html = '';
	html += `<li class="${CATEGORY_MENU_ITEM} ${theme.CATEGORY_MENU_ITEM} ${theme.CATEGORY_MENU_ITEM_ADAPTIVE}" data-category="${category}">`;
		html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
			html += `<a class="${CATEGORY_MENU_LINK} ${theme.LINK_TOPIC}" href=#${itemId}>`;
				html += `${category} `;
				html += `<span class="${CATEGORY_MENU_LINK_TOTAL} ${theme.COLOR_MUTE}">${total}</span>`;
			html += '</a>';
		html += '</h2>';
	html += '</li>';
	return html;
}