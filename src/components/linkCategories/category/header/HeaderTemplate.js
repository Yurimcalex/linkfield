import { LINK_CATEGORY_HEADER } from '../../../classNames.js';
import { replaceSpace } from '../../../utils.js';


export function createTemplate(category, linkTypes) {
	let html = '';
	html += `<h2 id=${replaceSpace(category)} class=${LINK_CATEGORY_HEADER}>`;
		html += `<span>${category}</span>`;
		html += `<span class="visibility">Arrange by ${createSelect(linkTypes)}</span>`;
	html += '</h2>';
	return html;
}


export function createSelect(types) {
	let html = '';
	html += '<select name="Arrange-by-type">';
	for (let type of types) {
		html += `<option value=${replaceSpace(type)} data-type="${type}">${type}</option>`;
	}
		html += '<option value="no" selected disabled>Select option</option>';
	html += '</select>';
	return html;
}


export function createOption(type) {
	return `<option value=${replaceSpace(type)} data-type="${type}">${type}</option>`;
}