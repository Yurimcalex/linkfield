import {
	CATEGORY_MENU,
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK 
} from '../classNames.js';
import { replaceSpace } from '../../ui/utils.js';


/*
	data = [{ category, total }, ...]
	total - number of links in category
*/
export default class Menu {
	constructor(categories, selectedCategory, storeAction) {
		this.node = document.querySelector(`.${CATEGORY_MENU}`);
		this.create(categories);
		this.highlight(selectedCategory);
		
		this.node.addEventListener('click', (e) => {
			const target = e.target.closest(`.${CATEGORY_MENU_ITEM}`);
			if (target) {
				storeAction(target.dataset.category, e);	
			}
		});
	}

	createItemTemplate(category, itemId, total) {
		let html = '';
		html += `<li class="${CATEGORY_MENU_ITEM}" data-category="${category}">`;
			html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
				html += `<a class="${CATEGORY_MENU_LINK}" href=#${itemId}>`;
					html += `${category} `;
					html += `<span>${total}</span>`;
				html += '</a>';
			html += '</h2>';
		html += '</li>';
		return html;
	}

	create(categories) {
		this.node.innerHTML = categories.reduce((html, { category, total }) => {
			return html + this.createItemTemplate(category, replaceSpace(category), total);
		}, '');
	}

	highlight(category) {
		if (!category) return;
		const highlighted = this.node.querySelector('li.highlight');
		if (highlighted) highlighted.classList.remove('highlight');
		const target = this.node.querySelector(`li[data-category="${category}"]`);
		if (target) target.classList.add('highlight');
	}

	update(selectedCategory) {
		if (selectedCategory) this.highlight(selectedCategory);
	}
 }