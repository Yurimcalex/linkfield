import { LINK_CATEGORY, LINK_CATEGORY_HEADER } from '../../../classNames.js';
import { replaceSpace } from '../../../../ui/utils.js';


export default class Header {
	constructor(category, linkTypes) {
		this.create(category, linkTypes);
	}

	createTemplate(category, linkTypes) {
		let html = '';
		html += `<h2 id=${replaceSpace(category)} class=${LINK_CATEGORY_HEADER}>`;
			html += `<span>${category}</span>`;
			html += `<span class="visibility">Arrange by ${this.createSelect(linkTypes)}</span>`;
		html += '</h2>';
		return html;
	}

	createSelect(types) {
		let html = '';
		html += '<select name="Arrange-by-type">';
		for (let type of types) {
			html += `<option value=${replaceSpace(type)}>${type}</option>`;
		}
		html += '<option value="no" selected disabled>Select option</option>';
		html += '</select>';
		return html;
	}

	create(category, linkTypes) {
		const container = document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`);
		container.insertAdjacentHTML('afterbegin', this.createTemplate(category, linkTypes));
		this.node = container.querySelector('h2');
	}

	update() {}
}