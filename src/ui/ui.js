import applyHandlers from './handlers/handlers.js';

export default function createUI(data) {
  document
  	.querySelector('.category-menu')
  	.innerHTML = createCategoryMenuContent(data.map(d => d.title));

  document
  	.querySelector('.content')
  	.innerHTML = createMainContent(data);

  document
  	.querySelector('.link-creator select[name="type"]')
  	.innerHTML = createLinkTypeOptions(data);

  document
  	.querySelector('.link-creator select[name="category"]')
  	.innerHTML = createLinkCategoryOptions(data);

  applyHandlers();
}


export function createLink(linkData) {
	document
		.querySelector(`[data-category="${linkData.category}"]`)
		.innerHTML += createLinkListItem(linkData);
}


function createMainContent(data) {
	let html = '';
	for (let d of data) {
	  html += '<div class="link-category">';
	  html += `<h2 id=${replaceSpace(d.title)}>${d.title}</h2>`;
	  html += createLinkList(d.links, d.title);
	  html += '</div>';
	}
	return html;
}


function createLinkList(links, category) {
	let html = '';
	html += `<ul class="link-list" data-category="${category}">`;
	for (let link of links) {
		html += createLinkListItem(link);
	}
	html += '</ul>';
	return html;
}


function createLinkListItem(linkData) {
	let html = '';
	html += '<li>';
		html += '<h3>';
			html += `<span class="link-type">${linkData.type}</span> `;
			html += `<a class="link-topic" href=${linkData.link} target="_blank">${linkData.topic}</a>`;
			html += '<div class="link-controls">';
				html += `<span><a class="link-btn edit-btn">&#128393;</a></span>`;
				html += '<span><a class="link-btn remove-btn">&#128473;</a></span>';
			html += '</div>';
		html += '</h3>';
	html += '</li>';
	return html;
}


function createCategoryMenuContent(items) {
	let html = '';
	for (let item of items) {
		html += '<li class="category-menu-item">';
			html += '<h2 class="category-menu-header">';
				html += `<a class="category-menu-content" href=${`#` + replaceSpace(item)}>${item}</a>`;
			html += '</h2>';
		html += '</li>';
	}
	return html;
}


function createLinkCategoryOptions(data) {
	let html = '';
	const categories = data.map(d => d.title);
	for (let category of categories) {
		html += `<option value="${category}">${category}</option>`
	}
	return html;
}


function createLinkTypeOptions(data) {
	let html = '';
	const types = getLinkTypes(data);
	for (let type of types) {
		html += `<option value=${type}>${type}</option>`
	}
	return html;
}


function getLinkTypes(data) {
	const types = data
		.map(d => d.links)
		.reduce((acc, links) => [...acc, ...links], [])
		.map(link => link.type);
	return Array.from(new Set(types));
}


function replaceSpace(str) {
	return str.split(' ').join('-');
}