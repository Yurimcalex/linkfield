import { dom } from '../elements.js';
import { replaceSpace, getCategoryFromHash, getIsSmallScreen, updateHash, scrollElementIntoView } from '../utils.js';


export default class Component {
	constructor(storeAction1, storeAction2) {
		this.content = dom.getContent();
		this.menu = dom.categoryMenu.getMenu();
		this.DY = 50; // takes into account the height of the menu bar

		window.addEventListener('resize', () => {
			const isSmallScreen = getIsSmallScreen();
			storeAction1(isSmallScreen);
			
			if (!isSmallScreen) {
				const category = getCategoryFromHash();
				if (category) {
					this.scrollToCategory(category, isSmallScreen);
					scrollElementIntoView(this.getMenuItemByCategory(category));
				}
			}
		});

		this.content.addEventListener('scroll', () => {
			this.focusOnCategoryMenuItem(storeAction2, this.content);
		});

		const category = getCategoryFromHash();
		if (category) scrollElementIntoView(this.getMenuItemByCategory(category));
	}

	// scroll the window for large screen, scroll the content for small screen
	scrollToCategory(category, isSmallScreen) {
		if (!category) return;
		const id = replaceSpace(category);
		const categoryHeader = dom.categoryHeader.getById(id);
		const container = isSmallScreen ? window : this.content;
		container.scrollTo(0, categoryHeader.offsetTop - (isSmallScreen ? this.DY : 0));
		updateHash(id);
	}

	focusOnCategoryMenuItem(fn, container) {
		const isSmall = getIsSmallScreen();
		let item;
		if (isSmall) return;
		if (container.scrollHeight - container.scrollTop - container.clientHeight === 0) {
			item = dom.categoryMenu.getLastItem(this.menu);
		} else {
			item = this.getMenuItemByPosition();
		}
		if (!item) return;
		if (item.classList.contains('highlight')) return;
		const id = replaceSpace(item.dataset.category);
		updateHash(id);
		fn(item.dataset.category);
		scrollElementIntoView(item);
	}

	getMenuItemByPosition() {
		let item = null;
		const centerX = document.documentElement.clientWidth / 2;
		const elem = document.elementFromPoint(centerX, 20);
		const container = dom.getCategoryByElem(elem);
		if (container) {
			const category = container.dataset.category;
			item = this.getMenuItemByCategory(category);
		}
		return item;
	}

	getMenuItemByCategory(category) {
		return dom.categoryMenu.getItemByCategory(this.menu, category);
	}

	update(category, isSmallScreen) {
		if (isSmallScreen) {
			this.scrollToCategory(category, isSmallScreen);
		}
	}
}