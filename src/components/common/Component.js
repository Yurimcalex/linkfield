import { CONTENT, LINK_CATEGORY, CATEGORY_MENU, CATEGORY_MENU_ITEM } from '../classNames.js';
import { replaceSpace } from '../../ui/utils.js';


export default class Component {
	constructor(storeAction1, storeAction2) {
		this.content = document.querySelector(`.${CONTENT}`);
		this.menu = document.querySelector(`.${CATEGORY_MENU}`);
		this.DY = 50; // takes into account the height of the menu bar

		window.addEventListener('resize', () => {
			storeAction1(this.getIsSmallScreen());
		});

		this.content.addEventListener('scroll', () => {
			this.focusCategoryMenuItem(storeAction2);
		});
	}

	getIsSmallScreen() {
	  const SMALL_SCREEN_WIDTH = 650;
	  return window.innerWidth <= SMALL_SCREEN_WIDTH;
	}

	// scroll the window for large screen, scroll the content for small screen
	scrollContentTo(category, isSmallScreen) {
		if (!category) return;
		const id = replaceSpace(category);
		const categoryHeader = document.getElementById(id);
		const container = isSmallScreen ? window : this.content;
		container.scrollTo(0, categoryHeader.offsetTop - (isSmallScreen ? this.DY : 0));
		history.pushState(null, null, id);
	}

	scrollMenuItemIntoView(menu, item) {
		const itemCoords = item.getBoundingClientRect();
		if (itemCoords.top < 0) {
			item.scrollIntoView();
		} else if (itemCoords.top > window.innerHeight - itemCoords.height) {
			item.scrollIntoView(false);
		}
	}

	focusCategoryMenuItem(fn) {
		const isSmall = this.getIsSmallScreen();
		if (isSmall) return;
		const menuItem = this.getMenuItemToFocus();
		if (!menuItem) return;
		if (menuItem.classList.contains('highlight')) return;
		fn(menuItem.dataset.category);
		this.scrollMenuItemIntoView(this.menu, menuItem);
	}

	getMenuItemToFocus() {
		let menuItem = null;
		const centerX = document.documentElement.clientWidth / 2;
		const elem = document.elementFromPoint(centerX, 20);
		const container = elem.closest(`.${LINK_CATEGORY}`);
		if (container) {
			const category = container.dataset.category;
			menuItem = this.menu.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"]`);
		}
		return menuItem;
	}


	update(category, isSmallScreen) {
		if (isSmallScreen) {
			this.scrollContentTo(category, isSmallScreen);
		}
	}
}