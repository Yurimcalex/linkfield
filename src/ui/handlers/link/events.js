import { handleLinkFormOpen } from './linkFormOpen.js';
import { handleLinkDisplay } from './linkDisplay.js';
import { handleLinkFormClose } from './linkFormClose.js';
import { handleLinkHover } from './linkHover.js';
import { handleLinkClick } from './linkClick.js';
import { handleLinkRemove } from './linkRemove.js';
import { handleLinkEdit } from './linkEdit.js';


export function handleLinkEvents() {
	handleLinkFormOpen();
	handleLinkDisplay();
	handleLinkFormClose();
	handleLinkHover();
	handleLinkClick();
	handleLinkRemove();
	handleLinkEdit();
}