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
		html += createListItem(link);
	}
	html += '</ul>';
	return html;
}


function createListItem(linkData) {
	let html = '';
	html += '<li class="link-list-item">';
		html += '<h3>';
			html += `<span class="link-type">${linkData.type}</span> `;
			html += `<a class="link-topic" href=${linkData.link} target="_blank">${linkData.topic}</a>`;
			html += '<div class="link-controls visibility sm">';
				html += `<span><a class="link-btn edit-btn">&#128393;</a></span>`;
				html += '<span><a class="link-btn remove-btn">&#128473;</a></span>';
			html += '</div>';
		html += '</h3>';
	html += '</li>';
	return html;
}