import { CONTENT_HIDE, CATEGORY_MENU_SHOW, CATEGORY_MENU_OPENER_HIDE } from '../classNames.js';
import { dom } from '../elements.js';
import { replaceSpace, getCategoryFromHash, getIsSmallScreen, updateHash, scrollElementIntoView } from '../utils.js';


export default class Component {
	constructor(storeAction1, storeAction2) {
		this.content = dom.getContent();
		this.menu = dom.categoryMenu.getMenu();
		this.DY = 50; // takes into account the height of the menu bar
		this.storeAction1 = storeAction1;
		this.storeAction2 = storeAction2;
		this.handleResize = this.handleResize.bind(this);
		this.handleScroll = this.handleScroll.bind(this);

		window.addEventListener('resize', this.handleResize);
		this.content.addEventListener('scroll', this.handleScroll);

		const category = getCategoryFromHash();
		if (category) scrollElementIntoView(this.getMenuItemByCategory(category));
	}


	remove() {
		window.removeEventListener('resize', this.handleResize);
		this.content.removeEventListener('scroll', this.handleScroll);
	}


	handleResize() {
		const isSmallScreen = getIsSmallScreen();
		this.storeAction1(isSmallScreen);
		
		if (!isSmallScreen) {
			const category = getCategoryFromHash();
			if (category) {
				this.scrollToCategory(category, isSmallScreen);
				scrollElementIntoView(this.getMenuItemByCategory(category));
			}
		}

		if (!isSmallScreen) {
			this.content.classList.remove(`${CONTENT_HIDE}`);
			this.menu.classList.remove(`${CATEGORY_MENU_SHOW}`);
			dom.categoryMenu.getOpener().classList.remove(`${CATEGORY_MENU_OPENER_HIDE}`)
		}
	}

	handleScroll() {
		this.focusOnCategoryMenuItem(this.storeAction2, this.content);
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

	update(category, isSmallScreen, newCategory) {
		if (isSmallScreen) {
			this.scrollToCategory(category, isSmallScreen);
		}

		if (newCategory) {
			this.scrollToCategory(newCategory, false);
		}
	}
}