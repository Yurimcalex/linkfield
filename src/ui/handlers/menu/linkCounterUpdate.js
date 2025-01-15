import { REMOVE_BUTTON, elements } from '../../elements.js';

const { content, linkForm, categoryMenu } = elements;


export function handleLinkCounterUpdate() {
	content.addEventListener('click', decreaseCounter);
}


function decreaseCounter(e) {
	const target = e.target;
	if (target.classList.contains(`${REMOVE_BUTTON}`)) {
		const list = target.closest('[data-category]');
		const category = list.dataset.category;
		const linkCounter = elements.select(categoryMenu, 'categoryMenuLinkCounter', category);
		const value = Number(linkCounter.textContent);
		linkCounter.textContent = value - 1;
	}
}