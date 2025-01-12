import { elements } from '../../elements.js';
import { toggleMenu } from './menuOpen.js';
import { scrollContentTo } from './categorySelect.js';

const { content } = elements;


export function handleWindowResize() {
	window.addEventListener('resize', () => {
		toggleMenu(false);
		content.classList.remove('hide');
		scrollContentTo(location.hash);
	});
}