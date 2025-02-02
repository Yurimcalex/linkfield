import { createOptionsTemplate } from './LinkFormTemplate.js';
import { dom } from '../../elements.js';


export default class LinkFrom {
	constructor(categories, types, createLinkAction, editLinkAction) {
		this.node = dom.linkForm.get();
		this.categorySelect = dom.linkForm.getCategorySelect(this.node);
		this.typeSelect = dom.linkForm.getTypesSelect(this.node);
		this.create(categories, types);
		this.dataTemplate = { src: '', description: '', type: '', category: '' };

		this.node.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target;
			
			if (target === this.node.add) {
				createLinkAction({ ...this.getFormData() });
			
			} else if (target === this.node.edit) {
				const linkElement = dom.link.getById(document, this.editingLinkId);
				linkElement.style.visibility = 'hidden';
				editLinkAction({ ...this.getFormData(), _id: this.editingLinkId });
			}
		});

		this.node.addEventListener('change', (e) => {
			const target = e.target;
			if (target.tagName === 'SELECT' && target.value === 'own') {
				const input = document.createElement('input');
				input.type = 'text';
				input.name = target.name;
				input.oninput = input.onblur = (e) => {
					if (!e.target.value) {
						input.replaceWith(target);
						target.value = '';
					}
				};
				target.replaceWith(input);
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
		for (let prop in this.dataTemplate) {
			this.node[prop].value = '';
		}
	}

	setCreateionMode() {
		this.reset();
		this.node.edit.classList.add('hide');
		this.node.add.classList.remove('hide');
	}

	setEditingMode(editedLinkData) {
		this.reset();
		this.editingLinkId = editedLinkData._id;
		this.setFormData(editedLinkData);
		this.node.edit.classList.remove('hide');
		this.node.add.classList.add('hide');
	}

	create(categories, types) {
		this.categorySelect.innerHTML = createOptionsTemplate(categories);
		this.typeSelect.innerHTML = createOptionsTemplate(types);
	}

	updateOptions(options) {
		const { categories, types } = options;
		this.create(categories, types);
	}

	update(mode, editedLinkData, newOptions) {
		if (mode === 'creation') this.setCreateionMode();
		if (mode === 'editing') this.setEditingMode(editedLinkData);
		if (newOptions) {
			this.updateOptions(newOptions);
		}
	}
}