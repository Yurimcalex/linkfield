// open and close category menu
const menu = document.querySelector('.category-menu');
const menuOpener = document.querySelector('.menu-opener');
const content = document.querySelector('.content');

// takes into account the height of the menu bar
const DY = 50;
const SMALL_SCREEN_WIDTH = 650;


export function handleMenuEvents() {	
	menuOpener.addEventListener('click', () => {
		toggleCategoryMenu(true);
		content.classList.add('hide');
	});

	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.tagName === 'A') {
			const href = target.getAttribute("href");
			e.preventDefault();
			content.classList.remove('hide');
			scrollContentTo(href);
			toggleCategoryMenu(false);
		};
	});

	window.addEventListener('resize', () => {
		toggleCategoryMenu(false);
		content.classList.remove('hide');
		scrollContentTo(location.hash);
	});
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
	const elem = document.getElementById(id.slice(1));
	const isSmall = isSmallScreen();
	const scrollTarget = isSmall ? window : content;
	// scroll the window for large screen, scroll the content for small screen,
	scrollTarget.scrollTo(0, elem.offsetTop - (isSmall ? DY : 0));
	history.pushState(null, null, id);
}