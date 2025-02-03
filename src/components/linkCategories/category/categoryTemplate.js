import {
	LINK_CATEGORY,
	LINK_LIST,
	LINK_LIST_ITEM,
	LINK_LIST_ITEM_CONTENT,
	LINK_TYPE,
	LINK_TOPIC,
	LINK_CONTROLS,
	LINK_CONTROLS_HIDE,
	LINK_CONTROLS_SM_SC,
	LINK_BUTTON,
	EDIT_BUTTON,
	REMOVE_BUTTON
} from '../../classNames.js';


export function createTemplate(category, linksData) {
	let html = '';
	html += `<div class="${LINK_CATEGORY}" data-category="${category}">`;
		html += `<ul class="${LINK_LIST}" data-category="${category}">`;
			linksData.forEach(link => {
				html += `${createListItemTemplate(link._id, link.src, link.type, link.description)}`;
			});
		html += '</ul>';
	html += '</div>';
	return html;
}


export function createListItemTemplate(id, linkSrc, linkType, linkDescription) {
	let html = '';
	html += `<li class="${LINK_LIST_ITEM}" data-linkid=${id}>`;
		html += `<h3 class=${LINK_LIST_ITEM_CONTENT}>`;
			html += `<span class="${LINK_TYPE}">${linkType}</span> `;
			html += `<a class="${LINK_TOPIC}" href=${linkSrc} target="_blank">${linkDescription}</a>`;
			html += `<div class="${LINK_CONTROLS} ${LINK_CONTROLS_HIDE} ${LINK_CONTROLS_SM_SC}">`;
				html += `<span><a class="${LINK_BUTTON} ${EDIT_BUTTON}" data-linkid=${id}>&#128393;</a></span>`;
				html += `<span><a class="${LINK_BUTTON} ${REMOVE_BUTTON}" data-linkid=${id}>&#128473;</a></span>`;
			html += '</div>';
		html += '</h3>';
	html += '</li>';
	return html;
}