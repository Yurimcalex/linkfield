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
		this.createLinkAction = createLinkAction;
		this.editLinkAction = editLinkAction;
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.node.addEventListener('click', this.handleClick);
		this.node.addEventListener('change', this.handleChange);
	}

	remove() {
		this.node.removeEventListener('click', this.handleClick);
		this.node.removeEventListener('change', this.handleChange);
		this.categorySelect.innerHTML = '';
		this.typeSelect.innerHTML = '';
	}

	handleChange(e) {
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
					target.nextElementSibling.style.display = 'flex';
					
				}
			};
			target.replaceWith(input);
			input.focus();
			input.parentNode.style.flex = '1';
			input.nextElementSibling.style.display = 'none';
		}
	}

	handleClick(e) {
		e.preventDefault();
		const target = e.target;
		
		if (target === this.node.add) {
			this.createLinkAction({ ...this.getFormData() });
		
		} else if (target === this.node.edit) {
			const linkElement = dom.link.getById(document, this.editingLinkId);
			linkElement.style.visibility = 'hidden';
			this.editLinkAction({ ...this.getFormData(), _id: this.editingLinkId });
		}
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
		this.node.category.nextElementSibling.style.display = 'flex';
		this.node.type.nextElementSibling.style.display = 'flex';
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