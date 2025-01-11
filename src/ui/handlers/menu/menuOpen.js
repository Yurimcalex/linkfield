const menu = document.querySelector('.category-menu');
const opener = document.querySelector('.menu-opener');
const content = document.querySelector('.content');

export function handleMenuOpen() {
	opener.addEventListener('click', () => {
		toggleMenu(true);
		content.classList.add('hide');
	});
}


export function toggleMenu(toOpen) {
	const meth = toOpen ? 'add' : 'remove';
	menu.classList[meth]('show');
	opener.classList[meth]('hide');
}