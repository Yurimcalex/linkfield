import {
	CONTENT,
	LINK_CATEGORY,
	LINK_LIST,
	LINK_LIST_ITEM,
	LINK_TYPE,
	LINK_TOPIC,
	LINK_CONTROLS,
	EDIT_BUTTON,
	REMOVE_BUTTON
} from '../../classNames.js';


// linksData = []
export default class Category {
	constructor(category, linksData) {
		this.node = null;
		this.category = category;
		this.create(category, linksData);
		this.list = this.node.querySelector(`.${LINK_LIST}`);
	}

	createTemplate(category, linksData) {
		let html = '';
		html += `<div class="${LINK_CATEGORY}" data-category="${category}">`;
			html += `<ul class="${LINK_LIST}" data-category="${category}">`;
				linksData.forEach(link => {
					html += `${this.createListItemTemplate(link.link, link.type, link.topic)}`;
				});
			html += '</ul>';
		html += '</div>';
		return html;
	}

	createListItemTemplate(linkSrc, linkType, linkDescription) {
		let html = '';
		html += `<li class="${LINK_LIST_ITEM}">`;
			html += '<h3>';
				html += `<span class="${LINK_TYPE}">${linkType}</span> `;
				html += `<a class="${LINK_TOPIC}" href=${linkSrc} target="_blank">${linkDescription}</a>`;
				html += `<div class="${LINK_CONTROLS} visibility sm">`;
					html += `<span><a class="link-btn ${EDIT_BUTTON}">&#128393;</a></span>`;
					html += `<span><a class="link-btn ${REMOVE_BUTTON}">&#128473;</a></span>`;
				html += '</div>';
			html += '</h3>';
		html += '</li>';
		return html;
	}

	arrange(type) {
		const items = Array.from(this.list.children).map(li => {
			const linkType = li.querySelector(`.${LINK_TYPE}`).textContent;
			return { type: linkType, element: li };
		});

		const newArrangedItems = items.sort((a, b) => {
			if (a.type === type) return -1;
				return 1;
			})
			.map(item => item.element);
			
		this.list.append(...newArrangedItems);
	}

	create(category, linksData) {
		const container = document.querySelector(`.${CONTENT}`);
		container.insertAdjacentHTML('beforeend', this.createTemplate(category, linksData));
		this.node = document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`);
	}

	update(linkType) {
		this.arrange(linkType);
	}
}