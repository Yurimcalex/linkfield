import { LINK_CATEGORY, LINK_CATEGORY_HEADER } from '../../../classNames.js';
import { replaceSpace } from '../../../../ui/utils.js';

import { createTemplate } from './HeaderTemplate.js';
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
		dom.getSelect(this.node).parentNode.classList.toggle('visibility');
	}

	create(category, linkTypes) {
		const categoryElement = dom.getCategory(category);
		categoryElement.insertAdjacentHTML('afterbegin', createTemplate(category, linkTypes));
		this.node = dom.getCategoryHeader(categoryElement);
	}

	removeSelectOption(type) {
		dom.getOptionByType(this.node, type).remove();
	}

	update(typeToRemove) {
		if (typeToRemove) this.removeSelectOption(typeToRemove);
	}
}