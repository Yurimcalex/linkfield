import { LINK_CATEGORY_HEADER } from '../elements.js';
import { replaceSpace } from '../utils.js';

export function createCategoryHeader(category, linkTypes) {
	let html = '';
	html += `<h2 id=${replaceSpace(category)} class=${LINK_CATEGORY_HEADER}>`;
		html += `<span>${category}</span>`;
		html += `<span class="visibility">Arrange by ${createSelect(linkTypes)}</span>`;
	html += '</h2>';
	return html;
}


function createSelect(types) {
	let html = '';
	html += '<select name="Arrange-by-type">';
	for (let type of types) {
		html += `<option value=${replaceSpace(type)}>${type}</option>`;
	}
	html += '<option value="no" selected disabled>Select option</option>';
	html += '</select>';
	return html;
}