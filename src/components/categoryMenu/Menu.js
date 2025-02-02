import { createItemTemplate } from './MenuTemplate.js';
import { dom } from '../elements.js';
import { replaceSpace } from '../utils.js';


/*
	data = [{ category, total }, ...]
	total - number of links in category
*/
export default class Menu {
	constructor(categories, selectedCategory, storeAction) {
		this.node = dom.categoryMenu.getMenu();
		this.create(categories);
		this.highlightItem(selectedCategory);
		
		this.node.addEventListener('click', (e) => {
			const menuItem = dom.categoryMenu.getItem(e.target);
			if (menuItem) {
				storeAction(menuItem.dataset.category, e);	
			}
		});
	}
	
	highlightItem(category) {
		if (!category) return;
		const highlightedItem = dom.categoryMenu.getHighlightedItem(this.node);
		if (highlightedItem) highlightedItem.classList.remove('highlight');
		const currentItem = dom.categoryMenu.getItemByCategory(this.node, category);
		if (currentItem) currentItem.classList.add('highlight');
	}

	changeLinkCount(categoryData) {
		const { category, total } = categoryData;
		dom.categoryMenu.getItemTotal(this.node, category).textContent = total;
		if (total === 0) {
			const menuItem = dom.categoryMenu.getItemByCategory(this.node, category);
			menuItem.remove();
		}
	}

	create(categories) {
		this.node.innerHTML = Object
			.entries(categories)
			.reduce((html, [category, total]) => {
				return html + createItemTemplate(category, replaceSpace(category), total);
			}, '');
	}

	update(selectedCategory, categoryData) {
		if (selectedCategory) this.highlightItem(selectedCategory);
		if (categoryData) this.changeLinkCount(categoryData);
	}
}