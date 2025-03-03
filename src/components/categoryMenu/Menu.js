import { theme } from '../classNames.js';
import { createItemTemplate } from './MenuTemplate.js';
import { dom } from '../elements.js';
import { replaceSpace, updateHash } from '../utils.js';


/*
	data = [{ category, total }, ...]
	total - number of links in category
*/
export default class Menu {
	constructor(categories, selectedCategory, storeAction) {
		this.storeAction = storeAction;
		this.node = dom.categoryMenu.getMenu();
		this.create(categories);
		this.highlightItem(selectedCategory);
		this.handleClick = this.handleClick.bind(this);
		this.node.addEventListener('click', this.handleClick);
	}

	handleClick(e) {
		const menuItem = dom.categoryMenu.getItem(e.target);
		if (menuItem) {
			this.storeAction(menuItem.dataset.category, e);	
		}
	}

	remove() {
		this.node.removeEventListener('click', this.handleClick);
		this.node.innerHTML = '';
	}
	
	highlightItem(category) {
		if (!category) return;
		const highlightedItem = dom.categoryMenu.getHighlightedItem(this.node);
		if (highlightedItem) highlightedItem.classList.remove(`${theme.CATEGORY_MENU_ITEM_SELECTED}`);
		const currentItem = dom.categoryMenu.getItemByCategory(this.node, category);
		if (currentItem) currentItem.classList.add(`${theme.CATEGORY_MENU_ITEM_SELECTED}`);
	}

	changeLinkCount(categoryData) {
		const { category, total } = categoryData;
		dom.categoryMenu.getItemTotal(this.node, category).textContent = total;
		if (total === 0) {
			const menuItem = dom.categoryMenu.getItemByCategory(this.node, category);
			menuItem.remove();
		}
	}

	createItem(categoryData) {
		const { category, total } = categoryData;
		this.node.insertAdjacentHTML('beforeend', createItemTemplate(category, replaceSpace(category), total));
	}

	create(categories) {
		this.node.innerHTML = Object
			.entries(categories)
			.reduce((html, [category, total]) => {
				return html + createItemTemplate(category, replaceSpace(category), total);
			}, '');
	}

	update(selectedCategory, categoryData, newCategoryData) {
		if (selectedCategory) this.highlightItem(selectedCategory);
		if (categoryData) this.changeLinkCount(categoryData);
		if (newCategoryData) this.createItem(newCategoryData);
	}
}