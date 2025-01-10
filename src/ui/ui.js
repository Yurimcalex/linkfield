import { createCategoryMenuContent } from './categoryMenu.js';
import { createContent } from './content.js';
import { createCategorySelectContent } from './categorySelect.js';
import { createTypeSelectContent } from './linkTypeSelect.js';
import applyHandlers from './handlers/handlers.js';


export default function createUI(data) {
  createCategoryMenuContent(data.map(d => d.title));
  createContent(data);
  createCategorySelectContent(data.map(d => d.title));
  createTypeSelectContent(getLinkTypes(data));

  applyHandlers();
}


function getLinkTypes(data) {
	const types = data
		.map(d => d.links)
		.reduce((acc, links) => [...acc, ...links], [])
		.map(link => link.type);
	return Array.from(new Set(types));
}