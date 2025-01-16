import {
	CATEGORY_MENU,
	CATEGORY_MENU_ITEM,
	CATEGORY_MENU_HEADER,
	CATEGORY_MENU_LINK 
} from './classNames.js';
import { replaceSpace } from '../ui/utils.js';


/*
	data = [{ category, total }, ...]
	total - number of links in category
*/
export default class Menu {
	constructor(data) {
		this.node = document.querySelector(`.${CATEGORY_MENU}`);
		this.data = data;
		this.create();
	}

	createItemTemplate(category, itemId, total) {
		let html = '';
		html += `<li class="${CATEGORY_MENU_ITEM}">`;
			html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
				html += `<a class="${CATEGORY_MENU_LINK}" href=#${itemId}>`;
					html += `${category} `;
					html += `<span>${total}</span>`;
				html += '</a>';
			html += '</h2>';
		html += '</li>';
		return html;
	}

	create() {
		this.node.innerHTML = this.data.reduce((html, { category, total }) => {
			return html + this.createItemTemplate(category, replaceSpace(category), total);
		}, '');
	}

	update(data) {}
 }