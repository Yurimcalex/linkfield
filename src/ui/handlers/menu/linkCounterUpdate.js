import { REMOVE_BUTTON, elements } from '../../elements.js';
import { getFormData } from '../link/linkDisplay.js';

const { content, linkForm, categoryMenu } = elements;


export function handleLinkCounterUpdate() {
	content.addEventListener('click', decreaseCounter);
	linkForm.add.addEventListener('click', increaseCounter);
}


function decreaseCounter(e) {
	const target = e.target;
	if (target.classList.contains(`${REMOVE_BUTTON}`)) {
		const list = target.closest('[data-category]');
		const category = list.dataset.category;
		updateCounter(category, -1);
	}
}


function increaseCounter(e) {
	const { category } = getFormData(linkForm);
	updateCounter(category, 1);
}


function updateCounter(category, newValue) {
	const linkCounter = elements.select(categoryMenu, 'categoryMenuLinkCounter', category);
	const currentValue = Number(linkCounter.textContent);
	linkCounter.textContent = currentValue + newValue;
} 