import { LINK_CATEGORY, LINK_CATEGORY_HEADER } from '../../../classNames.js';
import { replaceSpace } from '../../../../ui/utils.js';


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
			html += `<option value=${replaceSpace(type)} data-type="${type}">${type}</option>`;
		}
		html += '<option value="no" selected disabled>Select option</option>';
		html += '</select>';
		return html;
	}

	toggleSelect() {
		this.node.querySelector('select').parentNode.classList.toggle('visibility');
	}

	create(category, linkTypes) {
		const container = document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`);
		container.insertAdjacentHTML('afterbegin', this.createTemplate(category, linkTypes));
		this.node = container.querySelector('h2');
	}

	removeSelectOption(type) {
		this.node.querySelector(`option[data-type="${type}"]`).remove();
	}

	update(typeToRemove) {
		if (typeToRemove) this.removeSelectOption(typeToRemove);
	}
}



function createHoverEffect() {
	let currElm = null;
	return function create(container, fn) {
		container.addEventListener('mouseover', (e) => mouseover(e, container, fn));
		container.addEventListener('mouseout', (e) => mouseout(e, container, fn));
	};

	function mouseover(e, container, fn) {
		if (currElm) return;
		currElm = container;
		fn(currElm)
	}

	function mouseout(e, container, fn) {
		if (!currElm) return;

		let relatedTarget = event.relatedTarget;
		while (relatedTarget) {
			 if (relatedTarget == currElm) return;
			 relatedTarget = relatedTarget.parentNode;
		}

		fn(currElm);
		currElm = null;
	}
}


function replaceHyphen(str) {
	return str.split('-').join(' ');
}