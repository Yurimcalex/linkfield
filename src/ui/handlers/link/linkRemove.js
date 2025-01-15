import { REMOVE_BUTTON, LINK_LIST_ITEM, elements } from '../../elements.js';
import { displayControls } from './linkHover.js';

const { content } = elements;
export const clickData = {
	category: null
};


export function handleLinkRemove() {
	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains(`${REMOVE_BUTTON}`)) {
			const link = target.closest(`.${LINK_LIST_ITEM}`);
			const nextLink = link.nextElementSibling;
			if (nextLink) displayControls(nextLink);
			clickData.category = link.closest('[data-category]').dataset.category;
			link.remove();
		}
	});
}