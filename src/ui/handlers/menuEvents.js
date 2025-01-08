// open and close category menu
const menu = document.querySelector('.category-menu');
const menuOpener = document.querySelector('.menu-opener');
const content = document.querySelector('.content');

let isOpenerClicked = false;
// takes into account the height of the menu bar
const DY = 50;


export function handleMenuEvents() {	
	menuOpener.addEventListener('click', () => {
		toggleCategoryMenu(true);
		content.classList.add('hide');
	});

	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.tagName === 'A') {
			e.preventDefault();
			content.classList.remove('hide');
			scrollContentTo(target);
			toggleCategoryMenu(false);
		};
	});

	window.addEventListener('resize', () => {
		toggleCategoryMenu(false);
		content.classList.remove('hide');
	});
}


function toggleCategoryMenu(toOpen) {
	const meth = toOpen ? 'add' : 'remove';
	menu.classList[meth]('show');
	menuOpener.classList[meth]('hide');
	isOpenerClicked = toOpen;
}


function scrollContentTo(category) {
	const href = category.getAttribute("href");
	const elem = document.getElementById(href.slice(1));
	const scrollTarget = isOpenerClicked ? window : content;
	// scroll the window for large screen, scroll the content for small screen,
	scrollTarget.scrollTo(0, elem.offsetTop - (isOpenerClicked ? DY : 0));
	history.pushState(null, null, href);
}