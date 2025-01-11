const menu = document.querySelector('.category-menu');
let currMenuItem = null;

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
	if (container === currMenuItem) return;
	container.classList.add('highlight');
	if (currMenuItem) currMenuItem.classList.remove('highlight');
	currMenuItem = container;
}