const menu = document.querySelector('.category-menu');

export const menuInfo = {
	currentItem: null
};

export function handleMenuItemSelect() {
	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('category-menu-content')) {
			select(target);
		}
	});
}


function select(menuItem) {
	const container = menuItem.closest('.category-menu-item');
	if (container === menuInfo.currentItem) return;
	container.classList.add('highlight');
	if (menuInfo.currentItem) menuInfo.currentItem.classList.remove('highlight');
	menuInfo.currentItem = container;
}