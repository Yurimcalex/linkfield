import { handleMenuOpen } from './menuOpen.js';
import { handleCategorySelect } from './categorySelect.js';
import { handleWindowResize } from './windowResize.js';
import { handleMenuItemSelect } from './menuItemSelect.js';

// open and close category menu
const menu = document.querySelector('.category-menu');
const menuOpener = document.querySelector('.menu-opener');
const content = document.querySelector('.content');

// takes into account the height of the menu bar
const DY = 50;
const SMALL_SCREEN_WIDTH = 650;


export function handleMenuEvents() {
	handleMenuOpen();
	handleCategorySelect();
	handleWindowResize();
	handleMenuItemSelect();
	// menuOpener.addEventListener('click', () => {
	// 	toggleCategoryMenu(true);
	// 	content.classList.add('hide');
	// });

	// menu.addEventListener('click', (e) => {
	// 	const target = e.target;
	// 	if (target.tagName === 'A') {
	// 		const href = target.getAttribute("href");
	// 		e.preventDefault();
	// 		content.classList.remove('hide');
	// 		scrollContentTo(href);
	// 		toggleCategoryMenu(false);
	// 	};
	// });

	// window.addEventListener('resize', () => {
	// 	toggleCategoryMenu(false);
	// 	content.classList.remove('hide');
	// 	scrollContentTo(location.hash);
	// });


	// let currMenuItem = null;
	// menu.addEventListener('click', (e) => {
	// 	const target = e.target;
	// 	if (target.classList.contains('category-menu-content')) {
	// 		const container = target.closest('.category-menu-item');
	// 		if (container === currMenuItem) return;
	// 		container.classList.add('highlight');
	// 		if (currMenuItem) currMenuItem.classList.remove('highlight');
	// 		currMenuItem = container;
	// 	}
	// });


	content.addEventListener('scroll', (e) => {
		const centerX = document.documentElement.clientWidth / 2;
		const elem = document.elementFromPoint(centerX, 20);
		const container = elem.closest('.link-category');
		if (container) {
			const category = container.dataset.category;
			const menuLink = menu.querySelector(`a[href="#${replaceSpace(category)}"]`);
			const menuItem = menuLink.closest('li');

			if (menuItem.classList.contains('highlight')) {
				return;
			} else {
				if (currMenuItem) currMenuItem.classList.remove('highlight');
				menuItem.classList.add('highlight');
				currMenuItem = menuItem;
				scrollMenuItemIntoView(menu, menuItem);
			}
		}
	});
}


function scrollMenuItemIntoView(menu, item) {
	const scrollContainer = menu.closest('.menu-panel');
	const scrollY = scrollContainer.scrollTop;
	const itemCoords = item.getBoundingClientRect();
	if (itemCoords.top < 0) {
		item.scrollIntoView();
	} else if (itemCoords.top > window.innerHeight - itemCoords.height) {
		item.scrollIntoView(false);
	}
}


function isSmallScreen() {
	return window.innerWidth <= SMALL_SCREEN_WIDTH;
}


function toggleCategoryMenu(toOpen) {
	const meth = toOpen ? 'add' : 'remove';
	menu.classList[meth]('show');
	menuOpener.classList[meth]('hide');
}


function scrollContentTo(id) {
	if (!id) return;
	const elem = document.getElementById(id.slice(1));
	const isSmall = isSmallScreen();
	const scrollTarget = isSmall ? window : content;
	// scroll the window for large screen, scroll the content for small screen,
	scrollTarget.scrollTo(0, elem.offsetTop - (isSmall ? DY : 0));
	history.pushState(null, null, id);
}


function replaceSpace(str) {
	return str.split(' ').join('-');
}