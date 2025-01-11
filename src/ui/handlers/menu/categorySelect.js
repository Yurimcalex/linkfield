import { toggleMenu } from './menuOpen.js';

const menu = document.querySelector('.category-menu');
const opener = document.querySelector('.menu-opener');
const content = document.querySelector('.content');

// takes into account the height of the menu bar
const DY = 50;
const SMALL_SCREEN_WIDTH = 650;

export function handleCategorySelect() {
	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.tagName === 'A') {
			e.preventDefault();
			selectCategory(target);
		};
	});
}


function selectCategory(menuItem) {
	const href = menuItem.getAttribute("href");
	content.classList.remove('hide');
	scrollContentTo(href);
	toggleMenu(false);
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

function isSmallScreen() {
	return window.innerWidth <= SMALL_SCREEN_WIDTH;
}