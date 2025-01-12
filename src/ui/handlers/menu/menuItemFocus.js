import { LINK_CATEGORY, CATEGORY_MENU_ITEM, elements } from '../../elements.js';
import { menuInfo } from './menuItemSelect.js';

const { categoryMenu: menu, content } = elements;


export function handleMenuItemFocus() {
	content.addEventListener('scroll', (e) => {
		const centerX = document.documentElement.clientWidth / 2;
		const elem = document.elementFromPoint(centerX, 20);
		const container = elem.closest(`.${LINK_CATEGORY}`);
		if (container) {
			const category = container.dataset.category;
			const menuLink = elements.select(menu, 'categoryMenuLink', category);
			const menuItem = menuLink.closest(`.${CATEGORY_MENU_ITEM}`);

			if (menuItem.classList.contains('highlight')) {
				return;
			} else {
				if (menuInfo.currentItem) menuInfo.currentItem.classList.remove('highlight');
				menuItem.classList.add('highlight');
				menuInfo.currentItem = menuItem;
				scrollMenuItemIntoView(menu, menuItem);
			}
		}
	});
}


function scrollMenuItemIntoView(menu, item) {
	const itemCoords = item.getBoundingClientRect();
	if (itemCoords.top < 0) {
		item.scrollIntoView();
	} else if (itemCoords.top > window.innerHeight - itemCoords.height) {
		item.scrollIntoView(false);
	}
}