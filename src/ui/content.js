import { createLinkItem } from './linkItem.js';
import { replaceSpace } from './utils.js';

const content = document.querySelector('.content');


export function createContent(data) {
	content.innerHTML = createCategories(data);
}


function createCategories(data) {
	let html = '';
	for (let d of data) {
	  html += `<div class="link-category" data-category="${d.title}">`;
	  	html += `<h2 id=${replaceSpace(d.title)}>${d.title}</h2>`;
	  	html += createList(d.links, d.title);
	  html += '</div>';
	}
	return html;
}


function createList(links, category) {
	let html = '';
	html += `<ul class="link-list" data-category="${category}">`;
	for (let link of links) {
		html += createLinkItem(link);
	}
	html += '</ul>';
	return html;
}