import { CATEGORY_MENU_LINK, elements } from '../../elements.js';
import { toggleMenu } from './menuOpen.js';

const { categoryMenu: menu, openCategoryMenuButton: opener, content } = elements;

// takes into account the height of the menu bar
const DY = 50;
const SMALL_SCREEN_WIDTH = 650;


export function handleCategorySelect() {
	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains(`${CATEGORY_MENU_LINK}`)) {
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


export function scrollContentTo(id) {
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