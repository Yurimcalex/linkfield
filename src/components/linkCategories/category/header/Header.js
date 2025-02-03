import { LINK_CATEGORY_HEADER_HIDE } from '../../../classNames.js';
import { createTemplate, createOption } from './HeaderTemplate.js';
import { createHoverEffect, replaceHyphen } from '../../../utils.js';
import { dom } from '../../../elements.js';

  

export default class Header {
	constructor(category, linkTypes, storeAction) {
		this.create(category, linkTypes);
		createHoverEffect()(this.node, () => this.toggleSelect());

		this.node.addEventListener('change', (e) => {
			const category = replaceHyphen(this.node.getAttribute('id'));
			const type = replaceHyphen(e.target.value);
			storeAction({ category, type });
		});
	}

	toggleSelect() {
		dom.categoryHeader.getSelect(this.node).parentNode.classList.toggle(`${LINK_CATEGORY_HEADER_HIDE}`);
	}

	removeSelectOption(type) {
		dom.categoryHeader.getOptionByType(this.node, type).remove();
	}

	createSelectOption(type) {
		dom.categoryHeader
			.getSelect(this.node)
			.insertAdjacentHTML('afterbegin', createOption(type));
	}

	create(category, linkTypes) {
		const categoryElement = dom.getCategory(category);
		categoryElement.insertAdjacentHTML('afterbegin', createTemplate(category, linkTypes));
		this.node = dom.categoryHeader.get(categoryElement);
	}

	update(typeToRemove, typeToCreate) {
		if (typeToRemove) this.removeSelectOption(typeToRemove);
		if (typeToCreate) this.createSelectOption(typeToCreate);
	}
}