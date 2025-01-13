import { LINK_CATEGORY, elements } from '../../elements.js';

const { content } = elements;


export function handleCategorySort() {
	content.addEventListener('change', function (e) {
		const target = e.target;

		if (target.getAttribute('name') === 'Arrange-by-type') {
			const type = replaceHyphen(target.value);

			const container = target.closest(`.${LINK_CATEGORY}`);
			const category = container.dataset.category;
			const list = elements.select(container, 'linkList', category); 
			const listItems = Array.from(list.children);

			list.append(...arrange(listItems, type));
		}
	});
}


function arrange(linkItems, type) {
	const items = linkItems.map(li => {
		const linkType = elements.select(li, 'linkType').textContent;
		return { type: linkType, element: li };
	});

	return items
		.sort((a, b) => {
			if (a.type === type) return -1;
			return 1;
		})
		.map(item => item.element);
}


function replaceHyphen(str) {
	return str.split('-').join(' ');
}