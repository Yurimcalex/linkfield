import { LINK_FORM_BUTTON_HIDE, LINK_WINDOW_INPUT } from '../../classNames.js';
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
				input.className = `${LINK_WINDOW_INPUT}`;
				input.placeholder = 'Click outside the field to return';
				input.onblur = (e) => {
					if (!e.target.value) {
						input.replaceWith(target);
						target.options[0].selected = true;
						target.parentNode.style.flex = 'unset';
						target.nextElementSibling.style.display = 'block';
						
					}
				};
				target.replaceWith(input);
				input.focus();
				input.parentNode.style.flex = '1';
				input.nextElementSibling.style.display = 'none';
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
		if (this.node.category.tagName === 'INPUT') this.node.category.replaceWith(this.categorySelect);
		if (this.node.type.tagName === 'INPUT') this.node.type.replaceWith(this.typeSelect);
		this.node.category.options[0].selected = true;
		this.node.type.options[0].selected = true;
		this.node.description.value = '';
		this.node.src.value = '';

		this.node.category.parentNode.style.flex = 'unset';
		this.node.type.parentNode.style.flex = 'unset';
		this.node.category.nextElementSibling.style.display = 'block';
		this.node.type.nextElementSibling.style.display = 'block';
	}

	setCreateionMode() {
		this.reset();
		this.node.edit.classList.add(`${LINK_FORM_BUTTON_HIDE}`);
		this.node.add.classList.remove(`${LINK_FORM_BUTTON_HIDE}`);
	}

	setEditingMode(editedLinkData) {
		this.reset();
		this.editingLinkId = editedLinkData._id;
		this.setFormData(editedLinkData);
		this.node.edit.classList.remove(`${LINK_FORM_BUTTON_HIDE}`);
		this.node.add.classList.add(`${LINK_FORM_BUTTON_HIDE}`);
	}

	create(categories, types) {
		this.categorySelect.innerHTML = createOptionsTemplate(categories, 'category');
		this.typeSelect.innerHTML = createOptionsTemplate(types, 'type');
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