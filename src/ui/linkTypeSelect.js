import { replaceSpace } from './utils.js';

const select = document.querySelector('.link-creator select[name="type"]');

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