import { CATEGORY_MENU_ITEM, CATEGORY_MENU_LINK, elements } from '../../elements.js';

const { categoryMenu: menu } = elements;


export const menuInfo = {
	currentItem: null
};

export function handleMenuItemSelect() {
	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains(`${CATEGORY_MENU_LINK}`)) {
			select(target);
		}
	});
}


function select(menuItem) {
	const container = menuItem.closest(`.${CATEGORY_MENU_ITEM}`);
	if (container === menuInfo.currentItem) return;
	container.classList.add('highlight');
	if (menuInfo.currentItem) menuInfo.currentItem.classList.remove('highlight');
	menuInfo.currentItem = container;
}