import { handleMenuEvents, handleLinkEvents, loadingComplete } from './handlers.js';


export default function createUI(data) {
  document
  	.querySelector('.category-menu')
  	.innerHTML = createCategoryMenuContent(data.map(d => d.title));

  document
  	.querySelector('.content')
  	.innerHTML = createMainContent(data);

  document
  	.querySelector('.link-creator select')
  	.innerHTML = createLinkTypeOptions(data);

  handleMenuEvents();
  handleLinkEvents();
  loadingComplete();
}


function createMainContent(data) {
	let html = '';
	for (let d of data) {
	  html += '<div class="link-category">';
	  html += `<h2 id=${replaceSpace(d.title)}>${d.title}</h2>`;
	  html += createLinkList(d.links);
	  html += '</div>';
	}
	return html;
}


function createLinkList(links) {
	let html = '';
	html += '<ul class="link-list">';
	for (let link of links) {
		html += '<li>';
		html += `<h3><span>${link.type}</span> <a href=${link.link} target="_blank">${link.topic}</a></h3>`;
		html += '</li>';
	}
	html += '</ul>';
	return html;
}


function createCategoryMenuContent(items) {
	let html = '';
	for (let item of items) {
		html += '<li>';
		html += `<h2><a href=${`#` + replaceSpace(item)}>${item}</a></h2>`;
		html += '</li>';
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