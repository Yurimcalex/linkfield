import { replaceSpace } from '../utils.js';

export function createCategoryHeader(category, linkTypes) {
	let html = '';
	html += `<h2 id=${replaceSpace(category)}>`;
		html += `<span>${category}</span>`;
		html += `<span>Sort by ${createSelect(linkTypes)}</span>`;
	html += '</h2>';
	return html;
}


function createSelect(types) {
	let html = '';
	html += '<select name="sort-by-type">';
	for (let type of types) {
		html += `<option value=${replaceSpace(type)}>${type}</option>`;
	}
	html += '</select>';
	return html;
}