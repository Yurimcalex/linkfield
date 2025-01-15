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
	const categories = data.getCategories();
	categoryMenu.innerHTML = createCategoryMenuHTML(data, categories);
	content.innerHTML = createCategoriesHTML(data, categories);
  categorySelect.innerHTML = createCategoryOptions(categories);
  typeSelect.innerHTML = createTypeOptions(data.getLinkTypes());
  applyHandlers();
}


export function createLink(data) {
	elements
		.select(content, 'linkList', data.category)
		.innerHTML += createСategoryListItem(data.link, data.type, data.topic);
}


function createCategoryMenuHTML(data, categories) {
	return categories.reduce((html, category) => {
		const id = replaceSpace(category);
		const total = data.countLinkItems(category);
		return html + createCategoryMenuItem(category, id, total);
	}, '');
}


function createCategoriesHTML(data, categories) {
	let html = '';
	categories.forEach(category => {
		const linkTypes = data.getCategoryLinkTypes(category);
		const header = createCategoryHeader(category, linkTypes);
		let list = '';
		const links = data.getCategoryLinks(category);
		links.forEach(link => list += createСategoryListItem(link.link, link.type, link.topic));
		html += createLinkCategory(category, header, list);
	});
	return html;
}