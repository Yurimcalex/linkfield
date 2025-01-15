import { elements } from './elements.js';
import { replaceSpace } from './utils.js';
import { createCategoryMenuItem } from './templates/categoryMenu.js';
import { createLinkCategory } from './templates/linkCategory.js';
import { createСategoryListItem } from './templates/categoryListItem.js';
import { createCategoryHeader } from './templates/categoryHeader.js';
import { createCategoryOptions } from './templates/linkFormCategorySelect.js';
import { createTypeOptions } from './templates/linkFormTypeSelect.js';
import applyHandlers from './handlers/handlers.js';

const { categoryMenu, content, categorySelect, typeSelect } = elements;


export default function createUI(data) {
	categoryMenu.innerHTML = createCategoryMenuHTML(data);
	content.innerHTML = createCategoriesHTML(data);
  categorySelect.innerHTML = createCategoryOptions(getCategories(data));
  typeSelect.innerHTML = createTypeOptions(getLinkTypes(data));

  applyHandlers();
}


export function createLink(data) {
	elements
		.select(content, 'linkList', data.category)
		.innerHTML += createСategoryListItem(data.link, data.type, data.topic);
}


function createCategoryMenuHTML(data) {
	return getCategories(data).reduce((html, category) => {
		return html + createCategoryMenuItem(category, replaceSpace(category));
	}, '');
}


function createCategoriesHTML(data) {
	let categories = '';

	for (let d of data) {
		const category = d.title;
		const linkTypes = getCategoryLinkTypes(d.links);
		const header = createCategoryHeader(category, linkTypes);
		let list = '';

		for (let link of d.links) {
			list += createСategoryListItem(link.link, link.type, link.topic);
		}

		categories += createLinkCategory(category, header, list);
	}

	return categories;
}





function getCategories(data) {
	return data.map(d => d.title);
}


function getCategoryLinkData(data, categoryInd) {
	return data[categoryInd].links;
}


function getLinkTypes(data) {
	const types = data
		.map(d => d.links)
		.reduce((acc, links) => [...acc, ...links], [])
		.map(link => link.type);
	return Array.from(new Set(types));
}


export function getCategoryLinkTypes(links) {
	const types = [];
	links.forEach(link => types.push(link.type));
	return Array.from(new Set(types));
}