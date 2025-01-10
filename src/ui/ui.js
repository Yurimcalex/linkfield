import { createCategoryMenuContent } from './categoryMenu.js';
import { createContent } from './content.js';
import applyHandlers from './handlers/handlers.js';

export default function createUI(data) {
  createCategoryMenuContent(data.map(d => d.title));
  createContent(data);

  

  document
  	.querySelector('.link-creator select[name="type"]')
  	.innerHTML = createLinkTypeOptions(data);

  document
  	.querySelector('.link-creator select[name="category"]')
  	.innerHTML = createLinkCategoryOptions(data);

  applyHandlers();
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
		html += `<option value=${replaceSpace(type)}>${type}</option>`
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