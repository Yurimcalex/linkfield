import { handleMenuEvents } from './menu/events.js';
import { handleLinkEvents } from './link/events.js';

export default function apply() {
	handleLinkEvents();
	handleMenuEvents();
	loadingComplete();
}


function loadingComplete() {
	setTimeout(() => {
		document
			.querySelector('.loading-cover')
			.style.display = 'none';
		}, 0);
}