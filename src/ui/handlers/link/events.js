import { handleOpenLinkForm } from './openLinkForm.js';
import { handleDisplayCreatedLink } from './displayCreatedLink.js';
import { handleCloseLinkForm } from './closeLinkForm.js';
import { handleLinkHover } from './linkHover.js';
import { handleLinkClick } from './linkClick.js';
import { handleLinkRemove } from './linkRemove.js';
import { handleLinkEdit } from './linkEdit.js';


export function handleLinkEvents() {
	handleOpenLinkForm();
	handleDisplayCreatedLink();
	handleCloseLinkForm();
	handleLinkHover();
	handleLinkClick();
	handleLinkRemove();
	handleLinkEdit();
}