import { createContent } from './templates/content.js';
import { createCategorySelectContent } from './templates/categorySelect.js';
import { createTypeSelectContent } from './templates/linkTypeSelect.js';
import applyHandlers from './handlers/handlers.js';



import { elements } from './elements.js';
import { replaceSpace } from './utils.js';
import { createCategoryMenuItem } from './templates/categoryMenu.js';


const { categoryMenu } = elements;

export default function createUI(data) {
	categoryMenu.innerHTML = createCategoryMenuHTML(data);



  


  createContent(data);
  createCategorySelectContent(data.map(d => d.title));
  createTypeSelectContent(getLinkTypes(data));

  applyHandlers();
}


function createCategoryMenuHTML(data) {
	return getCategories(data).reduce((html, category) => {
		return html + createCategoryMenuItem(category, replaceSpace(category));
	}, '');
}





function getCategories(data) {
	return data.map(d => d.title);
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