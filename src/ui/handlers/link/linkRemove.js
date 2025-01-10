import { displayControls } from './linkHover.js';

const content = document.querySelector('.content');

export function handleLinkRemove() {
	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('remove-btn')) {
			const link = target.closest('li');
			const nextLink = link.nextElementSibling;
			if (nextLink) displayControls(nextLink);
			link.remove();
		}
	});
}