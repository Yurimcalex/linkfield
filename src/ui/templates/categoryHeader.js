import { replaceSpace } from '../utils.js';

export function createCategoryHeader(category) {
	let html = '';
	html += `<h2 id=${replaceSpace(category)}>${category}</h2>`;
	return html;
}