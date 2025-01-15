import {
	LINK_LIST_ITEM,
	LINK_TYPE,
	LINK_TOPIC,
	LINK_CONTROLS,
	EDIT_BUTTON,
	REMOVE_BUTTON
} from '../elements.js';
import { elements } from '../elements.js';


export function createLink(data) {
	elements
		.select(content, 'linkList', data.category)
		.innerHTML += createLinkItem(data);
}


export function createСategoryListItem(linkSrc, linkType, linkDescription) {
	let html = '';
	html += `<li class="${LINK_LIST_ITEM}">`;
		html += '<h3>';
			html += `<span class="${LINK_TYPE}">${linkType}</span> `;
			html += `<a class="${LINK_TOPIC}" href=${linkSrc} target="_blank">${linkDescription}</a>`;
			html += `<div class="${LINK_CONTROLS} visibility sm">`;
				html += `<span><a class="link-btn ${EDIT_BUTTON}">&#128393;</a></span>`;
				html += `<span><a class="link-btn ${REMOVE_BUTTON}">&#128473;</a></span>`;
			html += '</div>';
		html += '</h3>';
	html += '</li>';
	return html;
}