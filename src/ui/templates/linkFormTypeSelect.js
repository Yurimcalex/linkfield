import { replaceSpace } from '../utils.js';


export function createTypeOptions(types) {
	let html = '';
	for (let type of types) {
		html += `<option value=${replaceSpace(type)}>${type}</option>`
	}
	return html;
}