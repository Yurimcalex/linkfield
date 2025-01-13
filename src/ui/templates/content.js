import { LINK_CATEGORY, LINK_LIST } from '../elements.js';
import { elements } from '../elements.js';
import { createCategoryHeader } from './categoryHeader.js';
import { createLinkItem } from './linkItem.js';
import { getCategoryLinkTypes } from '../ui.js'; 


const { content } = elements;

export function createContent(data) {
	content.innerHTML = createCategories(data);
}


function createCategories(data) {
	let html = '';
	for (let d of data) {
		const linkTypes = getCategoryLinkTypes(d.links);
	  html += `<div class="${LINK_CATEGORY}" data-category="${d.title}">`;
	  	html += createCategoryHeader(d.title, linkTypes);
	  	html += createList(d.links, d.title);
	  html += '</div>';
	}
	return html;
}


function createList(links, category) {
	let html = '';
	html += `<ul class="${LINK_LIST}" data-category="${category}">`;
	for (let link of links) {
		html += createLinkItem(link);
	}
	html += '</ul>';
	return html;
}