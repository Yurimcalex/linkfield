import { LINK_CATEGORY_HEADER, LINK_CATEGORY_HEADER_SORTNAME, LINK_CATEGORY_HEADER_SELECT,
	LINK_CATEGORY_HEADER_HIDE, theme } from '../../../classNames.js';
import { replaceSpace } from '../../../utils.js';


export function createTemplate(category, linkTypes) {
	let html = '';
	html += `<h2 id=${replaceSpace(category)} class=${LINK_CATEGORY_HEADER}>`;
		html += `<span>${category}</span>`;
		html += `<span class="${LINK_CATEGORY_HEADER_HIDE} ${LINK_CATEGORY_HEADER_SORTNAME} ${theme.COLOR_MUTE}">`
			html += `Arrange by ${createSelect(linkTypes)}`
		html += '</span>';
	html += '</h2>';
	return html;
}


export function createSelect(types) {
	let html = '';
	html += `<select class="${LINK_CATEGORY_HEADER_SELECT}" name="Arrange-by-type">`;
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