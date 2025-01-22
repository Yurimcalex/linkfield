import { createOptionsTemplate } from './LinkFormTemplate.js';
import { dom } from '../../elements.js';


export default class LinkFrom {
	constructor(categories, types, createLinkAction, editLinkAction) {
		this.node = dom.linkForm.get();
		this.categorySelect = dom.linkForm.getCategorySelect(this.node);
		this.typeSelect = dom.linkForm.getTypesSelect(this.node);
		this.create(categories, types);
		this.dataTemplate = { link: '', topic: '', type: '', category: '' };

		this.node.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target;
			
			if (target === this.node.add) {
				createLinkAction({ ...this.getFormData(), id: String(Math.random()).slice(2, 10) });
			} else if (target === this.node.edit) {
				editLinkAction({ ...this.getFormData(), id: this.editingLinkId });
			}
		});
	}

	getFormData() {
		const data = { ...this.dataTemplate };
		for (let prop in data) {
			data[prop] = this.node[prop].value;
		}
		return data;
	}

	setFormData(linkData) {
		for (let prop in this.dataTemplate) {
			this.node[prop].value = linkData[prop];
		}
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
		this.editingLinkId = editedLinkData.id;
		this.setFormData(editedLinkData);
		this.node.edit.classList.remove('hide');
		this.node.add.classList.add('hide');
	}

	create(categories, types) {
		this.categorySelect.innerHTML = createOptionsTemplate(categories);
		this.typeSelect.innerHTML = createOptionsTemplate(types);
	}

	update(mode, editedLinkData) {
		if (mode === 'creation') this.setCreateionMode();
		if (mode === 'editing') this.setEditingMode(editedLinkData);
	}
}