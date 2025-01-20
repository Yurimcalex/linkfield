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

	reset() {
		this.node.link.value = '';
		this.node.topic.value = '';
	}

	setCreateionMode() {
		this.reset();
		this.node.edit.classList.add('hide');
		this.node.add.classList.remove('hide');
	}

	create(categories, types) {
		this.categorySelect.innerHTML = this.createOptionsTemplate(categories);
		this.typeSelect.innerHTML = this.createOptionsTemplate(types);
	}


	update(mode) {
		if (mode === 'creation') this.setCreateionMode();
	}
}