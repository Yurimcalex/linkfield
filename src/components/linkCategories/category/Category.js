import { dom } from '../../elements.js';
import { createTemplate, createListItemTemplate } from './categoryTemplate.js';
import { createHoverEffect, isVisible } from '../../utils.js';


let prevHoveredItem = null;

export default class Category {
	constructor(category, linksData, removeLinkAction, openLinkFormAction) {
		this.category = category;
		this.create(category, linksData);
		this.node = dom.getCategory(category);
		this.list = dom.getLinkList(category); 
		this.createHover = createHoverEffect();

		this.node.addEventListener('click', (e) => {
			const target = e.target;
			const id = target.dataset.linkid;
			const link = dom.getLink(target);
			
			if (target === dom.getLinkRemoveButton(target)) {
				removeLinkAction(id);
			} else if (target === dom.getLinkEditButton(target)) {
				openLinkFormAction(id);
				this.selectLink(link, dom.getCurrentSelectedLink());
			} else {
				if (link) this.selectLink(link, dom.getCurrentSelectedLink());
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
			dom.getLinkControls(prevLink).classList.add('visibility');
		}
		link.classList.add('current');
		dom.getLinkControls(link).classList.remove('visibility');
	}

	hoverLink(link) {
		if (link.classList.contains('current')) return;
		const controls = dom.getLinkControls(link);
		if (prevHoveredItem !== link) { // in
			controls.classList.remove('visibility');
			prevHoveredItem = link;
		} else { // out
			controls.classList.add('visibility');
			prevHoveredItem = null;
		}
	}

	highlightLink(link) {
		link.classList.add('highlight');
		setTimeout(() => {
			link.classList.remove('highlight');
		}, 2000);
	}

	focusLink(link) {
		this.selectLink(link, dom.getCurrentSelectedLink());
		if (!isVisible(link)) link.scrollIntoView(false);
		this.highlightLink(link);
	}

	// type - stored in filters slice of the store
	arrangeLinksByType(type) {
		const items = Array.from(this.list.children)
			.map(link => ({ type: dom.getLinkType(link).textContent, element: link }));
		const arrangedLinks = items
			.sort((a, b) => a.type === type ? -1 : 1)
			.map(item => item.element);
		this.list.append(...arrangedLinks);
	}

	// id - stored in links slice of the store
	removeLink(id) {
		const link = dom.getLinkById(this.list, id);
		if (link) {
			const nextLink = link.nextElementSibling;
			if (nextLink) dom.getLinkControls(nextLink).classList.remove('visibility');
			link.remove();
		}
	}

	// data comes from the links slice of the store
	createLink(data) {
		this.list.insertAdjacentHTML(
			'beforeend',
			createListItemTemplate(data.id, data.link, data.type, data.topic)
		);
		const link = dom.getLastLink(this.list);
		this.createHover(link, (...args) => this.hoverLink(...args));
		this.focusLink(link);
	}

	// data comes from the links slice of the store
	updateLink(data) {
		const { id, link, type, topic, category } = data;
		const linkElement = dom.getLinkById(document, id);
		const linkType = dom.getLinkType(linkElement);
		const linkTopic = dom.getLinkTopic(linkElement);
		linkType.textContent = type;
		linkTopic.src = link;
		linkTopic.textContent = topic;
		if (!this.list.contains(linkElement)) this.list.append(linkElement);
		this.focusLink(linkElement);
	}


	create(category, linksData) {
		dom.getContent().insertAdjacentHTML('beforeend', createTemplate(category, linksData));
	}

	update(linkType, removedLinkId, createdLinkData, editedLinkData) {
		if (linkType) this.arrangeLinksByType(linkType);
		if (removedLinkId) this.removeLink(removedLinkId);
		if (createdLinkData) this.createLink(createdLinkData);
		if (editedLinkData) this.updateLink(editedLinkData);
	}
}