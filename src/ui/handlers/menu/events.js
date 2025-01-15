import { handleMenuOpen } from './menuOpen.js';
import { handleCategorySelect } from './categorySelect.js';
import { handleWindowResize } from './windowResize.js';
import { handleMenuItemSelect } from './menuItemSelect.js';
import { handleMenuItemFocus } from './menuItemFocus.js';
import { handleLinkCounterUpdate } from './linkCounterUpdate.js';


export function handleMenuEvents() {
	handleMenuOpen();
	handleCategorySelect();
	handleWindowResize();
	handleMenuItemSelect();
	handleMenuItemFocus();
	handleLinkCounterUpdate();
}