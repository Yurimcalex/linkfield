import { replaceSpace } from './utils.js';

const menu = document.querySelector('.category-menu');


export function createCategoryMenuContent(data) {
	menu.innerHTML = createContent(data);
}


function createContent(items) {
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