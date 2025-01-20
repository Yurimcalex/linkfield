import { LINK_FORM } from '../../classNames.js';


export default class LinkFrom {
	constructor(categories, types) {
		this.node = document.querySelector(`.${LINK_FORM}`);
		this.categorySelect = this.node.querySelector(`select[name="category"]`);
		this.typeSelect = this.node.querySelector(`select[name="type"]`);
		this.create(categories, types);
	}

	createOptionsTemplate(items) {
		let html = '';
		for (let item of items) {
			html += `<option value="${item}">${item}</option>`;
		}
		return html;
	}

	create(categories, types) {
		this.categorySelect.innerHTML = this.createOptionsTemplate(categories);
		this.typeSelect.innerHTML = this.createOptionsTemplate(types);
	}

	update() {

	}
}