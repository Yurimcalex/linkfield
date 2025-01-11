import { elements } from './elements.js';
import { replaceSpace } from './utils.js';

const { typeSelect: select } = elements;


export function createTypeSelectContent(data) {
	select.innerHTML = createOptions(data);
}


function createOptions(data) {
	let html = '';
	for (let d of data) {
		html += `<option value=${replaceSpace(d)}>${d}</option>`
	}
	return html;
}