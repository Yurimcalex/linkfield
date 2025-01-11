import { menuInfo } from './menuItemSelect.js';
import { replaceSpace } from '../../utils.js';
 
const menu = document.querySelector('.category-menu');
const content = document.querySelector('.content');

export function handleMenuItemFocus() {
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
				if (menuInfo.currentItem) menuInfo.currentItem.classList.remove('highlight');
				menuItem.classList.add('highlight');
				menuInfo.currentItem = menuItem;
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