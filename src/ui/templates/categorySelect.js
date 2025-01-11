import { elements } from '../elements.js';

const { categorySelect: select } = elements;


export function createCategorySelectContent(data) {
	select.innerHTML = createOptions(data);
}


function createOptions(data) {
	let html = '';
	for (let d of data) {
		html += `<option value="${d}">${d}</option>`
	}
	return html;
}