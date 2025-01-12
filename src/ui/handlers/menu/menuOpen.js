import { elements } from '../../elements.js';

const { categoryMenu: menu, openCategoryMenuButton: opener, content } = elements;


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