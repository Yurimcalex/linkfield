import {
	CONTENT, LINK_CATEGORY, LINK_LIST, LINK_LIST_ITEM, LINK_TYPE, LINK_TOPIC, LINK_CONTROLS,
	EDIT_BUTTON,
	REMOVE_BUTTON
} from '../../classNames.js';
import { 
	getContent, getCategory, getLinkList, getLinkRemoveButton, getLinkEditButton, getLink,
	getCurrentSelectedLink, getLinkControls } from '../../elements.js';
import { createTemplate, createListItemTemplate } from './categoryTemplate.js';
import { createHoverEffect } from '../../utils.js';


// linksData = []
export default class Category {
	constructor(category, linksData, removeLinkAction, openLinkFormAction) {
		this.category = category;
		this.create(category, linksData);
		this.node = getCategory(category);
		this.list = getLinkList(category); 
		this.prevHoveredItem = null;
		this.createHover = createHoverEffect();

		this.node.addEventListener('click', (e) => {
			const target = e.target;
			const id = target.dataset.linkid;
			const link = getLink(target);
			
			if (target === getLinkRemoveButton(target)) {
				removeLinkAction(id);
			} else if (target === getLinkEditButton(target)) {
				openLinkFormAction(id);
				this.selectLink(link, getCurrentSelectedLink());
			} else {
				if (link) this.selectLink(link, getCurrentSelectedLink());
			}
		});

		for (let link of this.list.children) {
			this.createHover(link, (...args) => this.hoverLink(...args));
		}
	}

	// pure ui without the store affecting on the component visual state
	selectLink(link, prevLink) {
		if (prevLink) {
			prevLink.classList.remove('current');
			getLinkControls(prevLink).classList.add('visibility');
		}
		link.classList.add('current');
		getLinkControls(link).classList.remove('visibility');
	}

	hoverLink(link) {
		if (link.classList.contains('current')) return;
		const controls = getLinkControls(link);
		if (this.prevHoveredItem !== link) { // in
			controls.classList.remove('visibility');
			this.prevHoveredItem = link;
		} else { // out
			controls.classList.add('visibility');
			this.prevHoveredItem = null;
		}
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

	

	isVisible(item) {
		const { top, height } = item.getBoundingClientRect();
		return top > 0 && top < window.innerHeight - height;
	}

	highlightListItemForTime(item) {
		item.classList.add('highlight');
		setTimeout(() => {
			item.classList.remove('highlight');
		}, 2000);
	}

	listItemFocus(item) {
		this.selectListItem(item);
		if (!this.isVisible(item)) {
			item.scrollIntoView(false);
		}
		this.highlightListItemForTime(item);
	}

	createItem(data) {
		const html = createListItemTemplate(data.id, data.link, data.type, data.topic);
		this.list.insertAdjacentHTML('beforeend', html);
		const item = this.list.querySelector(`.${LINK_LIST_ITEM}:last-child`);
		createHoverEffect()(item, (...args) => this.hoverListItem(...args));
		this.listItemFocus(item);
	}

	updateList(data) {
		const { id, link, type, topic, category } = data;
		const item = document.querySelector(`.${LINK_LIST_ITEM}[data-linkid="${id}"]`);
		item.querySelector(`.${LINK_TYPE}`).textContent = type;
		const a = item.querySelector(`.${LINK_TOPIC}`);
		a.href = link;
		a.textContent = topic;
		if (!this.list.contains(item)) {
			this.list.append(item);
		}
		this.listItemFocus(item);
	}

	create(category, linksData) {
		getContent()
			.insertAdjacentHTML('beforeend', createTemplate(category, linksData));
	}

	update(linkType, removedLinkId, createdLinkData, editedLinkData) {
		if (linkType) this.arrange(linkType);

		if (removedLinkId) {
			const item = this.list.querySelector(`.${LINK_LIST_ITEM}[data-linkid="${removedLinkId}"]`);
			if (item) item.remove();
		}
		if (createdLinkData) {
			this.createItem(createdLinkData);
		}
		if (editedLinkData) {
			this.updateList(editedLinkData);
		}
	}
}