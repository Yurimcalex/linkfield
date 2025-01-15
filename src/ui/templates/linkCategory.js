import { LINK_CATEGORY, LINK_LIST } from '../elements.js';


export function createLinkCategory(category, headerHTML, listHTML) {
	let html = '';
	html += `<div class="${LINK_CATEGORY}" data-category="${category}">`;
		html += headerHTML;
		html += `<ul class="${LINK_LIST}" data-category="${category}">`;
			html += listHTML;
		html += '</ul>';
	html += '</div>';
	return html;
}