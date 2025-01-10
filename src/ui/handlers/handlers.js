import { handleMenuEvents } from './menuEvents.js';
import { handleLinkEvents } from './link/events.js';

export default function apply() {
	handleMenuEvents();
	handleLinkEvents();
	loadingComplete();
}


function loadingComplete() {
	setTimeout(() => {
		document
			.querySelector('.loading-cover')
			.style.display = 'none';
		}, 0);
}