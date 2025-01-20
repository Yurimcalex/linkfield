import { LINK_FORM } from '../../classNames.js';


export default class LinkFrom {
	constructor(categories, types, createLinkAction) {
		this.node = document.querySelector(`.${LINK_FORM}`);
		this.categorySelect = this.node.querySelector(`select[name="category"]`);
		this.typeSelect = this.node.querySelector(`select[name="type"]`);
		this.create(categories, types);
		this.node.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target;
			if (target === this.node.add) {
				createLinkAction(this.getData());
			}
		});
	}

	createOptionsTemplate(items) {
		let html = '';
		for (let item of items) {
			html += `<option value="${item}">${item}</option>`;
		}
		return html;
	}

	getData() {
		const data = { link: '', topic: '', type: '', category: '' };
		for (let prop in data) {
			data[prop] = this.node[prop].value;
		}
		data.id = String(Math.random()).slice(2, 10);
		return data;
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

	setEditingMode(editedLinkData) {
		this.reset();
		this.node.edit.classList.remove('hide');
		this.node.add.classList.add('hide');
		const { link, type, topic, category } = editedLinkData;
		this.node.link.value = link;
		this.node.type.value = type;
		this.node.topic.value = topic;
		this.node.category.value = category;
	}

	create(categories, types) {
		this.categorySelect.innerHTML = this.createOptionsTemplate(categories);
		this.typeSelect.innerHTML = this.createOptionsTemplate(types);
	}


	update(mode, editedLinkData) {
		if (mode === 'creation') this.setCreateionMode();
		if (mode === 'editing') this.setEditingMode(editedLinkData);
	}
}